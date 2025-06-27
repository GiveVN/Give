/**
 * project controller
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreController("api::project.project", ({ strapi }) => ({
  // Existing controller methods...

  /**
   * Get project progress including milestones
   */
  async getProgress(ctx) {
    const { id } = ctx.params;

    try {
      const project = await strapi.entityService.findOne('api::project.project', id, {
        populate: {
          GoalMilestones: true,
          Donations: {
            fields: ['Amount', 'Currency', 'createdAt'],
            filters: {
              Status: 'completed'
            }
          }
        }
      });

      if (!project) {
        return ctx.notFound('Project not found');
      }

      // Calculate progress percentage
      const progressPercentage = project.FundingGoal > 0 
        ? Math.min((project.CurrentFunding / project.FundingGoal) * 100, 100)
        : 0;

      // Calculate days remaining
      const now = new Date();
      const endDate = new Date(project.EndDate);
      const daysRemaining = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));

      // Check and update milestones
      const updatedMilestones = project.GoalMilestones?.map(milestone => {
        if (!milestone.IsReached && project.CurrentFunding >= milestone.TargetAmount) {
          return {
            ...milestone,
            IsReached: true,
            ReachedAt: new Date()
          };
        }
        return milestone;
      }) || [];

      // Update milestones if any changed
      const milestonesChanged = updatedMilestones.some((milestone, index) => 
        milestone.IsReached !== project.GoalMilestones[index]?.IsReached
      );

      if (milestonesChanged) {
        await strapi.entityService.update('api::project.project', id, {
          data: {
            GoalMilestones: updatedMilestones
          }
        });
      }

      // Calculate recent donations (last 24 hours)
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const recentDonations = project.Donations?.filter(d => 
        new Date(d.createdAt) > oneDayAgo
      ) || [];

      const recentDonationsTotal = recentDonations.reduce((sum, d) => sum + parseFloat(d.Amount), 0);

      return ctx.send({
        projectId: project.id,
        title: project.Title,
        fundingGoal: project.FundingGoal,
        currentFunding: project.CurrentFunding,
        currency: project.Currency,
        progressPercentage,
        backersCount: project.BackersCount,
        daysRemaining,
        isActive: project.ProjectStatus === 'active',
        isFunded: project.CurrentFunding >= project.FundingGoal,
        milestones: updatedMilestones.sort((a, b) => a.TargetAmount - b.TargetAmount),
        recentDonations: {
          count: recentDonations.length,
          total: recentDonationsTotal
        },
        showProgressBar: project.ShowProgressBar,
        showBackersCount: project.ShowBackersCount,
        showTimeRemaining: project.ShowTimeRemaining,
        stretchGoal: project.EnableStretchGoals ? project.StretchGoal : null,
        minimumDonation: project.MinimumDonation
      });
    } catch (error) {
      strapi.log.error('Error getting project progress:', error);
      return ctx.internalServerError('Failed to get project progress');
    }
  },

  /**
   * Update project funding (called after successful donation)
   */
  async updateFunding(ctx) {
    const { id } = ctx.params;
    const { amount, donorId } = ctx.request.body;

    try {
      // Get current project data
      const project = await strapi.entityService.findOne('api::project.project', id, {
        populate: ['GoalMilestones']
      });

      if (!project) {
        return ctx.notFound('Project not found');
      }

      // Update funding and backers count
      const newFunding = parseFloat(project.CurrentFunding) + parseFloat(amount);
      const newBackersCount = project.BackersCount + 1;

      // Check if project reached its goal
      const wasNotFunded = project.CurrentFunding < project.FundingGoal;
      const isNowFunded = newFunding >= project.FundingGoal;
      const justReachedGoal = wasNotFunded && isNowFunded;

      // Update project
      const updatedProject = await strapi.entityService.update('api::project.project', id, {
        data: {
          CurrentFunding: newFunding,
          BackersCount: newBackersCount,
          ProjectStatus: justReachedGoal ? 'funded' : project.ProjectStatus
        }
      });

      // Send notification if goal reached
      if (justReachedGoal) {
        // TODO: Send email notification to project creator
        strapi.log.info(`Project ${project.Title} reached its funding goal!`);
      }

      return ctx.send({
        success: true,
        project: {
          id: updatedProject.id,
          currentFunding: updatedProject.CurrentFunding,
          backersCount: updatedProject.BackersCount,
          status: updatedProject.ProjectStatus,
          goalReached: justReachedGoal
        }
      });
    } catch (error) {
      strapi.log.error('Error updating project funding:', error);
      return ctx.internalServerError('Failed to update project funding');
    }
  },

  /**
   * Get project statistics
   */
  async getStatistics(ctx) {
    const { id } = ctx.params;

    try {
      const project = await strapi.entityService.findOne('api::project.project', id, {
        populate: {
          Donations: {
            fields: ['Amount', 'Currency', 'createdAt', 'IsAnonymous'],
            filters: {
              Status: 'completed'
            },
            populate: {
              User: {
                fields: ['username', 'email']
              }
            }
          }
        }
      });

      if (!project) {
        return ctx.notFound('Project not found');
      }

      // Group donations by day
      const donationsByDay = {};
      project.Donations?.forEach(donation => {
        const date = new Date(donation.createdAt).toISOString().split('T')[0];
        if (!donationsByDay[date]) {
          donationsByDay[date] = {
            count: 0,
            total: 0
          };
        }
        donationsByDay[date].count++;
        donationsByDay[date].total += parseFloat(donation.Amount);
      });

      // Calculate average donation
      const totalDonations = project.Donations?.length || 0;
      const averageDonation = totalDonations > 0 
        ? project.CurrentFunding / totalDonations 
        : 0;

      // Get top backers (non-anonymous)
      const topBackers = project.Donations
        ?.filter(d => !d.IsAnonymous && d.User)
        .sort((a, b) => parseFloat(b.Amount) - parseFloat(a.Amount))
        .slice(0, 10)
        .map(d => ({
          username: d.User.username,
          amount: d.Amount,
          date: d.createdAt
        })) || [];

      return ctx.send({
        projectId: project.id,
        statistics: {
          totalRaised: project.CurrentFunding,
          totalBackers: project.BackersCount,
          averageDonation,
          donationsByDay,
          topBackers,
          fundingProgress: {
            percentage: (project.CurrentFunding / project.FundingGoal) * 100,
            remaining: Math.max(0, project.FundingGoal - project.CurrentFunding)
          }
        }
      });
    } catch (error) {
      strapi.log.error('Error getting project statistics:', error);
      return ctx.internalServerError('Failed to get project statistics');
    }
  }
}));
