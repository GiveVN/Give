import { Client } from 'pg';

async function checkAdminProjectPermissions() {
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

    // 1. Check admin user and role
    console.log('\n👤 ADMIN USER INFO:');
    const adminUser = await client.query(`
      SELECT au.id, au.email, au.firstname, au.lastname, au.is_active,
             ar.name as role_name, ar.code as role_code
      FROM admin_users au
      LEFT JOIN admin_users_roles_lnk aurl ON au.id = aurl.user_id
      LEFT JOIN admin_roles ar ON aurl.role_id = ar.id
      WHERE au.email = 'ai@rate.box';
    `);
    console.table(adminUser.rows);

    // 2. Check admin permissions for projects
    console.log('\n🔐 ADMIN PERMISSIONS FOR PROJECTS:');
    const projectPermissions = await client.query(`
      SELECT ap.id, ap.action, ap.subject, ap.properties, ap.conditions,
             ar.name as role_name
      FROM admin_permissions ap
      LEFT JOIN admin_permissions_role_lnk aprl ON ap.id = aprl.permission_id
      LEFT JOIN admin_roles ar ON aprl.role_id = ar.id
      WHERE ap.subject LIKE '%project%' OR ap.subject LIKE '%api::project%'
      ORDER BY ar.name, ap.action;
    `);
    console.table(projectPermissions.rows);

    // 3. Check if there are any permissions at all
    console.log('\n📋 ALL ADMIN PERMISSIONS:');
    const allPermissions = await client.query(`
      SELECT ap.action, ap.subject, COUNT(*) as count
      FROM admin_permissions ap
      GROUP BY ap.action, ap.subject
      ORDER BY ap.subject, ap.action;
    `);
    console.table(allPermissions.rows);

    // 4. Check projects table directly from admin perspective
    console.log('\n📊 PROJECTS FROM DATABASE:');
    const projects = await client.query(`
      SELECT id, document_id, title, locale, published_at, created_by_id, updated_by_id
      FROM projects 
      WHERE published_at IS NOT NULL
      ORDER BY id;
    `);
    console.table(projects.rows);

    // 5. Check if there are any content-manager specific permissions
    console.log('\n🎛️ CONTENT MANAGER PERMISSIONS:');
    const contentManagerPerms = await client.query(`
      SELECT ap.action, ap.subject, ap.properties, ar.name as role_name
      FROM admin_permissions ap
      LEFT JOIN admin_permissions_role_lnk aprl ON ap.id = aprl.permission_id
      LEFT JOIN admin_roles ar ON aprl.role_id = ar.id
      WHERE ap.action LIKE '%read%' OR ap.action LIKE '%find%'
      ORDER BY ar.name, ap.subject;
    `);
    console.table(contentManagerPerms.rows);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

checkAdminProjectPermissions().catch(console.error); 