const { Client } = require('pg');

async function checkProjects() {
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

    // Count total projects
    const countQuery = `SELECT COUNT(*) as total FROM projects;`;
    const countResult = await client.query(countQuery);
    console.log(`\n📊 Total projects in database: ${countResult.rows[0].total}`);

    // Show all projects
    const selectQuery = `
      SELECT id, title, locale, published_at, project_status
      FROM projects 
      ORDER BY id
      LIMIT 10;
    `;

    const projects = await client.query(selectQuery);
    console.log('\n📋 Projects list:');
    
    if (projects.rows.length === 0) {
      console.log('❌ No projects found in database!');
    } else {
      projects.rows.forEach(project => {
        const status = project.published_at ? 'PUBLISHED' : 'DRAFT';
        console.log(`- ID ${project.id}: "${project.title}" - Locale: ${project.locale} - ${status}`);
      });
    }

  } catch (error) {
    console.error('❌ Database Error:', error.message);
    console.error('Full error:', error);
  } finally {
    try {
      await client.end();
      console.log('\n🔌 Database connection closed');
    } catch (e) {
      console.error('Error closing connection:', e.message);
    }
  }
}

checkProjects(); 