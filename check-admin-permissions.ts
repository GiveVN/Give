import { Client } from 'pg';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
}

interface AdminRole {
  id: number;
  name: string;
  code: string;
  description: string;
}

interface ProjectData {
  id: number;
  title: string;
  locale: string;
  published_at: string;
  project_status: string;
}

async function checkAdminPermissions(): Promise<void> {
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

    // Check admin users
    console.log('\n👤 Admin Users:');
    const adminUsers = await client.query<AdminUser>(`
      SELECT id, username, email, blocked 
      FROM admin_users 
      ORDER BY id
    `);
    console.table(adminUsers.rows);

    // Check admin roles
    console.log('\n🔐 Admin Roles:');
    const adminRoles = await client.query<AdminRole>(`
      SELECT id, name, code, description
      FROM admin_roles 
      ORDER BY id
    `);
    console.table(adminRoles.rows);

    // Check user-role assignments
    console.log('\n🔗 User-Role Assignments:');
    const userRoles = await client.query(`
      SELECT au.username, au.email, ar.name as role_name, ar.code as role_code
      FROM admin_users au
      LEFT JOIN admin_users_roles_links aurl ON au.id = aurl.user_id
      LEFT JOIN admin_roles ar ON aurl.role_id = ar.id
      ORDER BY au.id
    `);
    console.table(userRoles.rows);

    // Check projects data
    console.log('\n📊 Projects Summary:');
    const projectsSummary = await client.query<ProjectData>(`
      SELECT id, title, locale, published_at, project_status
      FROM projects 
      ORDER BY id
      LIMIT 10
    `);
    console.table(projectsSummary.rows);

    // Check admin permissions for projects
    console.log('\n🔑 Admin Permissions for Projects:');
    const permissions = await client.query(`
      SELECT ap.action, ap.subject, ar.name as role_name
      FROM admin_permissions ap
      JOIN admin_roles ar ON ap.role_id = ar.id
      WHERE ap.subject LIKE '%project%' OR ap.subject = 'api::project.project'
      ORDER BY ar.name, ap.action
    `);
    console.table(permissions.rows);

    // Recommendations
    console.log('\n💡 TROUBLESHOOTING RECOMMENDATIONS:');
    
    if (adminUsers.rows.length === 0) {
      console.log('❌ No admin users found! Create admin user first.');
    } else {
      const blockedUsers = adminUsers.rows.filter(user => user.blocked);
      if (blockedUsers.length > 0) {
        console.log('⚠️  Blocked admin users found:', blockedUsers.map(u => u.email));
      }
    }

    if (permissions.rows.length === 0) {
      console.log('❌ No project permissions found! Admin may not have access to projects.');
      console.log('🔧 Try: Go to Settings → Roles → Super Admin → Permissions');
    }

    console.log('\n🌐 BROWSER TROUBLESHOOTING:');
    console.log('1. Clear browser cache (Ctrl+Shift+Delete)');
    console.log('2. Try incognito/private mode');
    console.log('3. Check browser console for JavaScript errors');
    console.log('4. Verify admin URL: http://localhost:1338/admin');
    console.log('5. Login with: ai@rate.box / Y--BFZr!D6gu');

  } catch (error) {
    console.error('❌ Database connection error:', error);
  } finally {
    await client.end();
  }
}

// Run the check
checkAdminPermissions().catch(console.error); 