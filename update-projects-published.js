const { Client } = require('pg');

async function updateProjectsToPublished() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'give',
    user: 'JOY',
    password: 'J8p!x2wqZs7vQ4rL'
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Update all projects to published status
    const updateQuery = `
      UPDATE projects 
      SET published_at = NOW(), updated_at = NOW()
      WHERE published_at IS NULL;
    `;

    const result = await client.query(updateQuery);
    console.log(`✅ Updated ${result.rowCount} projects to published status`);

    // Show all projects with their status
    const selectQuery = `
      SELECT id, title, published_at, created_at, updated_at, "projectStatus"
      FROM projects 
      ORDER BY id;
    `;

    const projects = await client.query(selectQuery);
    console.log('\n📋 All projects status:');
    projects.rows.forEach(project => {
      const status = project.published_at ? 'PUBLISHED' : 'DRAFT';
      console.log(`- ID ${project.id}: "${project.title}" - ${status} (projectStatus: ${project.projectStatus})`);
    });

  } catch (error) {
    console.error('❌ Error updating projects:', error.message);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed');
  }
}

updateProjectsToPublished(); 