import { Client } from 'pg';

async function simpleDebug(): Promise<void> {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'give',
    user: 'JOY',
    password: 'J8p!x2wqZs7vQ4rL'
  });

  try {
    await client.connect();
    console.log('🔗 Connected to PostgreSQL');

    // Check AI user
    console.log('\n👤 AI User:');
    const aiUser = await client.query(`
      SELECT id, username, email, blocked, is_active 
      FROM admin_users 
      WHERE email = 'ai@rate.box'
    `);
    console.table(aiUser.rows);

    // Check projects count
    console.log('\n📊 Projects Summary:');
    const projectStats = await client.query(`
      SELECT 
        COUNT(*) as total_projects,
        COUNT(CASE WHEN published_at IS NOT NULL THEN 1 END) as published_projects,
        COUNT(CASE WHEN locale = 'en' THEN 1 END) as english_projects
      FROM projects
    `);
    console.table(projectStats.rows);

    // List all admin tables to understand schema
    console.log('\n📋 Available Admin Tables:');
    const adminTables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE '%admin%'
      ORDER BY table_name
    `);
    console.table(adminTables.rows);

    // Check user roles (try different table name)
    console.log('\n🔗 Checking User Roles:');
    try {
      const userRoles = await client.query(`
        SELECT au.email, ar.name as role_name, ar.code as role_code
        FROM admin_users au
        JOIN admin_users_roles_links aurl ON au.id = aurl.user_id
        JOIN admin_roles ar ON aurl.role_id = ar.id
        WHERE au.email = 'ai@rate.box'
      `);
      console.table(userRoles.rows);
    } catch (error) {
      console.log('❌ admin_users_roles_links table not found, trying alternative...');
      
      // Try direct role check
      const roles = await client.query(`
        SELECT id, name, code, description 
        FROM admin_roles 
        ORDER BY id
      `);
      console.log('Available roles:');
      console.table(roles.rows);
    }

    // Test admin API endpoint simulation
    console.log('\n🔍 Simulating Admin Query:');
    const adminQuery = await client.query(`
      SELECT id, document_id, title, published_at, locale, project_status
      FROM projects 
      WHERE locale = 'en' 
      AND published_at IS NOT NULL
      ORDER BY title ASC
      LIMIT 10
    `);
    
    console.log(`Admin query would return ${adminQuery.rows.length} projects:`);
    console.table(adminQuery.rows.map(p => ({
      id: p.id,
      title: p.title.substring(0, 40),
      published_at: p.published_at ? new Date(p.published_at).toLocaleDateString() : 'Not published'
    })));

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

simpleDebug().catch(console.error); 