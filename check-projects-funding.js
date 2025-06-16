const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateProjectsFunding() {
  try {
    console.log('🔄 Updating projects with funding data...');

    // Update AI-Powered Learning Platform với funding data
    await prisma.projects.updateMany({
      where: {
        title: 'AI-Powered Learning Platform'
      },
      data: {
        fundingGoal: 50000,
        currentFunding: 12600,
        backersCount: 33
      }
    });

    // Update Clean Water Initiative
    await prisma.projects.updateMany({
      where: {
        title: 'Clean Water Initiative'
      },
      data: {
        fundingGoal: 25000,
        currentFunding: 8750,
        backersCount: 15
      }
    });

    // Update Mental Health Support App
    await prisma.projects.updateMany({
      where: {
        title: 'Mental Health Support App'
      },
      data: {
        fundingGoal: 75000,
        currentFunding: 22500,
        backersCount: 67
      }
    });

    console.log('✅ Projects funding updated successfully!');

    // Verify updates
    const updatedProjects = await prisma.projects.findMany({
      where: {
        title: {
          in: ['AI-Powered Learning Platform', 'Clean Water Initiative', 'Mental Health Support App']
        }
      },
      select: {
        id: true,
        title: true,
        fundingGoal: true,
        currentFunding: true,
        backersCount: true
      }
    });

    console.log('\n📊 Updated projects:');
    updatedProjects.forEach(project => {
      const percentage = project.fundingGoal > 0 
        ? Math.round((project.currentFunding / project.fundingGoal) * 100)
        : 0;
      console.log(`- ${project.title}: $${project.currentFunding}/$${project.fundingGoal} (${percentage}%) - ${project.backersCount} backers`);
    });

  } catch (error) {
    console.error('❌ Error updating projects funding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateProjectsFunding(); 