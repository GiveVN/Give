const { Client } = require('pg');

async function fixProjectStatus() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'give',
    user: 'JOY',
    password: 'J8p!x2wqZs7vQ4rL'
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL database');

    // Check current project_status values
    const checkQuery = `
      SELECT id, title, project_status, published_at
      FROM projects 
      ORDER BY id;
    `;

    const projects = await client.query(checkQuery);
    console.log('\n📋 Current project status:');
    projects.rows.forEach(project => {
      const publishStatus = project.published_at ? 'PUBLISHED' : 'DRAFT';
      console.log(`- ID ${project.id}: "${project.title}" - Status: ${project.project_status} - ${publishStatus}`);
    });

    // Update all projects with null project_status to 'active'
    const updateQuery = `
      UPDATE projects 
      SET project_status = 'active', updated_at = NOW()
      WHERE project_status IS NULL;
    `;

    const updateResult = await client.query(updateQuery);
    console.log(`\n✅ Updated ${updateResult.rowCount} projects to 'active' status`);

    // Show updated results
    const updatedProjects = await client.query(checkQuery);
    console.log('\n📋 Updated project status:');
    updatedProjects.rows.forEach(project => {
      const publishStatus = project.published_at ? 'PUBLISHED' : 'DRAFT';
      console.log(`- ID ${project.id}: "${project.title}" - Status: ${project.project_status} - ${publishStatus}`);
    });

  } catch (error) {
    console.error('❌ Database Error:', error.message);
  } finally {
    try {
      await client.end();
      console.log('\n🔌 Database connection closed');
    } catch (e) {
      console.error('Error closing connection:', e.message);
    }
  }
}

fixProjectStatus(); 