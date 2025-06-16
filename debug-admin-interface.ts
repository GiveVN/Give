import { Client } from 'pg';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  is_active: boolean;
}

interface Project {
  id: number;
  document_id: string;
  title: string;
  published_at: string | null;
  locale: string;
  project_status: string;
}

async function debugAdminInterface(): Promise<void> {
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

    // Check AI user status
    console.log('\n👤 AI User Status:');
    const aiUser = await client.query<AdminUser>(`
      SELECT id, username, email, blocked, is_active 
      FROM admin_users 
      WHERE email = 'ai@rate.box'
    `);
    console.table(aiUser.rows);

    // Check all projects with detailed info
    console.log('\n📊 All Projects Status:');
    const allProjects = await client.query<Project>(`
      SELECT id, document_id, title, published_at, locale, project_status
      FROM projects 
      ORDER BY id
    `);
    
    console.log(`Total projects in database: ${allProjects.rows.length}`);
    console.table(allProjects.rows.map(p => ({
      id: p.id,
      title: p.title.substring(0, 30),
      published: p.published_at ? '✅ YES' : '❌ NO',
      locale: p.locale,
      status: p.project_status
    })));

    // Check admin permissions for projects
    console.log('\n🔐 Admin Permissions for Projects:');
    const projectPermissions = await client.query(`
      SELECT ap.action, ap.subject, ap.conditions, ap.properties
      FROM admin_permissions ap
      JOIN admin_roles_permissions_links arpl ON ap.id = arpl.permission_id
      JOIN admin_roles ar ON arpl.role_id = ar.id
      WHERE ar.code = 'strapi-super-admin' 
      AND ap.subject LIKE '%project%'
      ORDER BY ap.action, ap.subject
    `);
    
    console.log(`Found ${projectPermissions.rows.length} project permissions:`);
    console.table(projectPermissions.rows);

    // Check if there are any locale-specific issues
    console.log('\n🌐 Locale Analysis:');
    const localeStats = await client.query(`
      SELECT locale, COUNT(*) as count, 
             COUNT(CASE WHEN published_at IS NOT NULL THEN 1 END) as published_count
      FROM projects 
      GROUP BY locale
      ORDER BY locale
    `);
    console.table(localeStats.rows);

    // Check admin_users_roles_links
    console.log('\n🔗 Admin User Role Assignments:');
    const userRoles = await client.query(`
      SELECT au.email, ar.name as role_name, ar.code as role_code
      FROM admin_users au
      JOIN admin_users_roles_links aurl ON au.id = aurl.user_id
      JOIN admin_roles ar ON aurl.role_id = ar.id
      WHERE au.email = 'ai@rate.box'
    `);
    console.table(userRoles.rows);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

// Run the debug function
debugAdminInterface().catch(console.error); 