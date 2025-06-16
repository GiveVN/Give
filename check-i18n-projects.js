const { Client } = require('pg');

async function checkI18nProjects() {
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

    // Check if projects table has i18n fields
    const structureQuery = `
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'projects'
      AND column_name IN ('locale', 'localizations')
      ORDER BY ordinal_position;
    `;

    const structure = await client.query(structureQuery);
    console.log('\n📋 i18n related columns in projects table:');
    if (structure.rows.length === 0) {
      console.log('❌ No i18n columns found (locale, localizations)');
    } else {
      structure.rows.forEach(col => {
        console.log(`- ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
      });
    }

    // Check all projects with their locale info
    const projectsQuery = `
      SELECT id, title, locale, published_at, project_status, created_at
      FROM projects 
      ORDER BY id;
    `;

    const projects = await client.query(projectsQuery);
    console.log('\n📋 All projects with locale info:');
    projects.rows.forEach(project => {
      const publishStatus = project.published_at ? 'PUBLISHED' : 'DRAFT';
      console.log(`- ID ${project.id}: "${project.title}" - Locale: ${project.locale} - ${publishStatus} - Status: ${project.project_status}`);
    });

    // Check if there are any projects_localizations table
    const localizationsTableQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'projects_localizations'
      );
    `;

    const localizationsExists = await client.query(localizationsTableQuery);
    console.log(`\n📋 projects_localizations table exists: ${localizationsExists.rows[0].exists}`);

    if (localizationsExists.rows[0].exists) {
      const localizationsQuery = `
        SELECT * FROM projects_localizations;
      `;
      const localizations = await client.query(localizationsQuery);
      console.log(`\n📋 projects_localizations entries: ${localizations.rows.length}`);
      localizations.rows.forEach(loc => {
        console.log(`- Project ${loc.project_id} <-> Project ${loc.inv_project_id}`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

checkI18nProjects(); 