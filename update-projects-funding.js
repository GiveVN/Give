const axios = require('axios');

const STRAPI_URL = 'http://localhost:1338';

async function updateProjectsFunding() {
  try {
    console.log('🔄 Updating projects with funding data...');

    // Get all projects first
    const response = await axios.get(`${STRAPI_URL}/api/projects`);
    const projects = response.data.data;

    // Find specific projects to update
    const aiProject = projects.find(p => p.title === 'AI-Powered Learning Platform');
    const waterProject = projects.find(p => p.title === 'Clean Water Initiative');
    const mentalHealthProject = projects.find(p => p.title === 'Mental Health Support App');

    const updates = [
      {
        project: aiProject,
        data: {
          fundingGoal: 50000,
          currentFunding: 12600,
          backersCount: 33
        }
      },
      {
        project: waterProject,
        data: {
          fundingGoal: 25000,
          currentFunding: 8750,
          backersCount: 15
        }
      },
      {
        project: mentalHealthProject,
        data: {
          fundingGoal: 75000,
          currentFunding: 22500,
          backersCount: 67
        }
      }
    ];

    // Update each project
    for (const update of updates) {
      if (update.project) {
        try {
          await axios.put(`${STRAPI_URL}/api/projects/${update.project.documentId}`, {
            data: update.data
          });
          
          const percentage = update.data.fundingGoal > 0 
            ? Math.round((update.data.currentFunding / update.data.fundingGoal) * 100)
            : 0;
          
          console.log(`✅ Updated ${update.project.title}: $${update.data.currentFunding}/$${update.data.fundingGoal} (${percentage}%) - ${update.data.backersCount} backers`);
        } catch (error) {
          console.error(`❌ Error updating ${update.project.title}:`, error.response?.data || error.message);
        }
      }
    }

    console.log('\n🎉 Funding data update completed!');

  } catch (error) {
    console.error('❌ Error fetching projects:', error.response?.data || error.message);
  }
}

updateProjectsFunding(); 