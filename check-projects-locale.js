const { Client } = require('pg');

async function checkProjectsLocale() {
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

    // Show all projects with locale info
    const selectQuery = `
      SELECT id, title, locale, published_at, project_status, created_at
      FROM projects 
      ORDER BY id;
    `;

    const projects = await client.query(selectQuery);
    console.log('\n📋 All projects with locale:');
    projects.rows.forEach(project => {
      const status = project.published_at ? 'PUBLISHED' : 'DRAFT';
      console.log(`- ID ${project.id}: "${project.title}" - Locale: ${project.locale} - ${status} - Status: ${project.project_status}`);
    });

    // Update all projects to have 'en' locale if they don't have one
    const updateLocaleQuery = `
      UPDATE projects 
      SET locale = 'en', updated_at = NOW()
      WHERE locale IS NULL OR locale = '';
    `;

    const updateResult = await client.query(updateLocaleQuery);
    console.log(`\n✅ Updated ${updateResult.rowCount} projects to have 'en' locale`);

    // Show updated results
    const updatedProjects = await client.query(selectQuery);
    console.log('\n📋 Updated projects:');
    updatedProjects.rows.forEach(project => {
      const status = project.published_at ? 'PUBLISHED' : 'DRAFT';
      console.log(`- ID ${project.id}: "${project.title}" - Locale: ${project.locale} - ${status}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed');
  }
}

checkProjectsLocale(); 