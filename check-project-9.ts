import { Client } from 'pg';

async function checkProject9() {
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

    // 1. Confirm Project ID 9 exists
    console.log('\n🎯 PROJECT ID 9:');
    const project9 = await client.query(`
      SELECT id, title, locale, published_at, document_id
      FROM projects WHERE id = 9;
    `);
    console.table(project9.rows);

    // 2. Check admin permissions table structure
    console.log('\n🔍 ADMIN PERMISSIONS TABLE STRUCTURE:');
    const permissionsStructure = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'admin_permissions' 
      ORDER BY ordinal_position;
    `);
    console.table(permissionsStructure.rows);

    // 3. Check admin permissions for projects (with correct column names)
    console.log('\n🔐 ADMIN PERMISSIONS FOR PROJECTS:');
    const permissions = await client.query(`
      SELECT action, subject, conditions, properties
      FROM admin_permissions 
      WHERE subject = 'api::project.project'
      ORDER BY action;
    `);
    console.table(permissions.rows);

    // 4. Test direct API call simulation
    console.log('\n🧪 SIMULATING STRAPI ADMIN QUERY:');
    const adminQuery = await client.query(`
      SELECT id, document_id, title, locale, published_at, created_at, updated_at
      FROM projects 
      WHERE locale = 'en' 
        AND published_at IS NOT NULL
      ORDER BY title ASC;
    `);
    console.log(`Found ${adminQuery.rows.length} projects that should appear in admin:`);
    console.table(adminQuery.rows.map(p => ({
      id: p.id,
      title: p.title.substring(0, 30) + '...',
      locale: p.locale,
      published: p.published_at ? '✅' : '❌'
    })));

    // 5. Check if there are any i18n related tables
    console.log('\n🌐 I18N RELATED TABLES:');
    const i18nTables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND (table_name LIKE '%localization%' OR table_name LIKE '%i18n%')
      ORDER BY table_name;
    `);
    console.table(i18nTables.rows);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

checkProject9(); 