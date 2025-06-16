const { Client } = require('pg');

async function checkAdminStatus() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'give',
    user: 'JOY',
    password: 'J8p!x2wqZs7vQ4rL'
  });

  try {
    await client.connect();
    console.log('🔍 KIỂM TRA ADMIN STATUS:');
    
    const adminResult = await client.query(`
      SELECT id, email, username, blocked 
      FROM admin_users 
      ORDER BY id;
    `);
    console.table(adminResult.rows);
    
    console.log('\n🔑 KIỂM TRA ADMIN ROLES:');
    const roleResult = await client.query(`
      SELECT au.id, au.email, ar.name as role_name, ar.description 
      FROM admin_users au 
      LEFT JOIN admin_users_roles_links aurl ON au.id = aurl.user_id 
      LEFT JOIN admin_roles ar ON aurl.role_id = ar.id 
      ORDER BY au.id;
    `);
    console.table(roleResult.rows);
    
    console.log('\n📋 KIỂM TRA PERMISSIONS:');
    const permResult = await client.query(`
      SELECT ap.action, ap.subject, ar.name as role_name
      FROM admin_permissions ap
      LEFT JOIN admin_roles_permissions_links arpl ON ap.id = arpl.permission_id
      LEFT JOIN admin_roles ar ON arpl.role_id = ar.id
      WHERE ap.subject = 'api::project.project'
      ORDER BY ar.name, ap.action;
    `);
    console.table(permResult.rows);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

checkAdminStatus(); 