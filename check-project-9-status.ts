import { Client } from 'pg';

async function checkProject9Status() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'give',
    user: 'JOY',
    password: 'J8p!x2wqZs7vQ4rL',
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // 1. Check all projects with their locales
    console.log('\n📋 ALL PROJECTS WITH LOCALES:');
    const allProjects = await client.query(`
      SELECT id, title, locale, published_at, created_at, updated_at, created_by_id, updated_by_id
      FROM projects 
      ORDER BY id;
    `);
    console.table(allProjects.rows);

    // 2. Check specific project ID 9
    console.log('\n🔍 PROJECT ID 9 DETAILS:');
    const project9 = await client.query(`
      SELECT * FROM projects WHERE id = 9;
    `);
    if (project9.rows.length > 0) {
      console.log('✅ Project ID 9 exists:');
      console.table(project9.rows);
    } else {
      console.log('❌ Project ID 9 NOT FOUND!');
    }

    // 3. Check projects with locale = 'en'
    console.log('\n🌐 PROJECTS WITH LOCALE = "en":');
    const enProjects = await client.query(`
      SELECT id, title, locale, published_at 
      FROM projects 
      WHERE locale = 'en'
      ORDER BY id;
    `);
    console.table(enProjects.rows);

    // 4. Check if there are any NULL locales
    console.log('\n❓ PROJECTS WITH NULL LOCALE:');
    const nullLocaleProjects = await client.query(`
      SELECT id, title, locale, published_at 
      FROM projects 
      WHERE locale IS NULL
      ORDER BY id;
    `);
    console.table(nullLocaleProjects.rows);

    // 5. Check admin permissions for projects
    console.log('\n🔐 ADMIN PERMISSIONS FOR PROJECTS:');
    const permissions = await client.query(`
      SELECT ap.action, ap.subject, ar.name as role_name
      FROM admin_permissions ap
      JOIN admin_roles ar ON ap.role_id = ar.id
      WHERE ap.subject = 'api::project.project'
      ORDER BY ap.action;
    `);
    console.table(permissions.rows);

    // 6. Test API-like query that Strapi might use
    console.log('\n🔍 STRAPI-LIKE QUERY TEST:');
    const strapiQuery = await client.query(`
      SELECT id, title, locale, published_at, created_at, updated_at
      FROM projects 
      WHERE locale = 'en' 
        AND published_at IS NOT NULL
      ORDER BY title ASC
      LIMIT 10;
    `);
    console.table(strapiQuery.rows);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

checkProject9Status(); 