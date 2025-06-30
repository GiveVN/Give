const { sanitize } = require('@strapi/utils');

module.exports = (plugin) => {
    const originalController = plugin.controllers.user;

    plugin.controllers.user = {
        ...originalController,

        /**
         * Get current user's profile with extended information
         */
        async me(ctx) {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized('You must be authenticated');
            }

            const sanitizedUser = await sanitize.contentAPI.output(user, strapi.getModel('plugin::users-permissions.user'));

            // Include additional profile data
            const profileData = await strapi.entityService.findOne('plugin::users-permissions.user', user.id, {
                populate: {
                    avatar: true,
                    coverImage: true,
                    socialLinks: true,
                    privacySettings: true,
                    notificationSettings: true,
                    Projects: {
                        populate: {
                            Media: true,
                            Category: true,
                        }
                    },
                    Donations: {
                        populate: {
                            Project: {
                                populate: {
                                    Media: true,
                                }
                            }
                        }
                    }
                }
            });

            ctx.body = {
                ...sanitizedUser,
                ...profileData,
            };
        },

        /**
         * Update current user's profile
         */
        async updateMe(ctx) {
            const user = ctx.state.user;
            const { body } = ctx.request;

            if (!user) {
                return ctx.unauthorized('You must be authenticated');
            }

            // Validate vanity URL uniqueness if provided
            if (body.vanityUrl && body.vanityUrl !== user.vanityUrl) {
                const existingUser = await strapi.entityService.findMany('plugin::users-permissions.user', {
                    filters: { vanityUrl: body.vanityUrl },
                });

                if (existingUser.length > 0) {
                    return ctx.badRequest('Vanity URL already taken');
                }
            }

            try {
                const updatedUser = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
                    data: body,
                    populate: {
                        avatar: true,
                        coverImage: true,
                        socialLinks: true,
                        privacySettings: true,
                        notificationSettings: true,
                    }
                });

                const sanitizedUser = await sanitize.contentAPI.output(updatedUser, strapi.getModel('plugin::users-permissions.user'));

                ctx.body = sanitizedUser;
            } catch (error) {
                ctx.badRequest('Failed to update profile', { error: error.message });
            }
        },

        /**
         * Get user profile by vanity URL
         */
        async getByVanityUrl(ctx) {
            const { vanityUrl } = ctx.params;

            try {
                const users = await strapi.entityService.findMany('plugin::users-permissions.user', {
                    filters: { vanityUrl },
                    populate: {
                        avatar: true,
                        coverImage: true,
                        socialLinks: true,
                        Projects: {
                            populate: {
                                Media: true,
                                Category: true,
                            }
                        }
                    }
                });

                if (users.length === 0) {
                    return ctx.notFound('User not found');
                }

                const user = users[0];

                // Check privacy settings
                if (user.privacySettings?.profileVisibility === 'private') {
                    return ctx.forbidden('Profile is private');
                }

                if (user.privacySettings?.profileVisibility === 'authenticated' && !ctx.state.user) {
                    return ctx.unauthorized('Authentication required to view this profile');
                }

                // Remove sensitive information
                const sanitizedUser = await sanitize.contentAPI.output(user, strapi.getModel('plugin::users-permissions.user'));

                ctx.body = sanitizedUser;
            } catch (error) {
                ctx.badRequest('Failed to fetch user profile', { error: error.message });
            }
        },

        /**
         * Check vanity URL availability
         */
        async checkVanityUrl(ctx) {
            const { vanityUrl } = ctx.params;
            const currentUser = ctx.state.user;

            if (!vanityUrl || vanityUrl.length < 3) {
                return ctx.badRequest('Vanity URL must be at least 3 characters long');
            }

            try {
                const users = await strapi.entityService.findMany('plugin::users-permissions.user', {
                    filters: { vanityUrl },
                });

                const isAvailable = users.length === 0 || (currentUser && users[0].id === currentUser.id);

                ctx.body = {
                    vanityUrl,
                    available: isAvailable,
                };
            } catch (error) {
                ctx.badRequest('Failed to check vanity URL availability', { error: error.message });
            }
        },

        /**
         * Get user's donation history
         */
        async getDonationHistory(ctx) {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized('You must be authenticated');
            }

            try {
                const donations = await strapi.entityService.findMany('api::donation.donation', {
                    filters: { Giver: user.id },
                    populate: {
                        Project: {
                            populate: {
                                Media: true,
                                Creator: true,
                            }
                        }
                    },
                    sort: { createdAt: 'desc' },
                });

                ctx.body = donations;
            } catch (error) {
                ctx.badRequest('Failed to fetch donation history', { error: error.message });
            }
        },

        /**
         * Get user's project statistics
         */
        async getProjectStats(ctx) {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized('You must be authenticated');
            }

            try {
                const projects = await strapi.entityService.findMany('api::project.project', {
                    filters: { Creator: user.id },
                    populate: {
                        Donations: true,
                    }
                });

                const stats = {
                    totalProjects: projects.length,
                    activeProjects: projects.filter(p => p.ProjectStatus === 'active').length,
                    fundedProjects: projects.filter(p => p.ProjectStatus === 'funded').length,
                    totalRaised: projects.reduce((sum, p) => sum + (p.CurrentFunding || 0), 0),
                    totalBackers: projects.reduce((sum, p) => sum + (p.BackersCount || 0), 0),
                };

                ctx.body = stats;
            } catch (error) {
                ctx.badRequest('Failed to fetch project statistics', { error: error.message });
            }
        },
    };

    return plugin;
};