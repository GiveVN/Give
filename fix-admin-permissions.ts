import { Client } from 'pg';

interface TableInfo {
  table_name: string;
  column_name: string;
  data_type: string;
}

async function fixAdminPermissions(): Promise<void> {
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

    // Check available admin tables
    console.log('\n📋 Available Admin Tables:');
    const adminTables = await client.query<{table_name: string}>(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE '%admin%'
      ORDER BY table_name
    `);
    console.table(adminTables.rows);

    // Check admin users
    console.log('\n👤 Admin Users:');
    const adminUsers = await client.query(`
      SELECT id, username, email, blocked, created_at, updated_at
      FROM admin_users 
      ORDER BY id
    `);
    console.table(adminUsers.rows);

    // Try to find roles table (different possible names)
    const possibleRolesTables = ['admin_roles', 'strapi_administrator_roles', 'roles'];
    let rolesTable: string | null = null;

    for (const tableName of possibleRolesTables) {
      try {
        const result = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
        rolesTable = tableName;
        console.log(`✅ Found roles table: ${tableName}`);
        break;
      } catch (error) {
        console.log(`❌ Table ${tableName} not found`);
      }
    }

    if (rolesTable) {
      console.log(`\n🔐 Admin Roles (from ${rolesTable}):`);
      const roles = await client.query(`SELECT * FROM ${rolesTable} ORDER BY id`);
      console.table(roles.rows);
    }

    // Check permissions table
    const possiblePermissionsTables = ['admin_permissions', 'strapi_administrator_permissions', 'permissions'];
    let permissionsTable: string | null = null;

    for (const tableName of possiblePermissionsTables) {
      try {
        const result = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
        permissionsTable = tableName;
        console.log(`✅ Found permissions table: ${tableName}`);
        break;
      } catch (error) {
        console.log(`❌ Table ${tableName} not found`);
      }
    }

    if (permissionsTable) {
      console.log(`\n🔑 Admin Permissions (from ${permissionsTable}):`);
      const permissions = await client.query(`
        SELECT action, subject, properties, conditions 
        FROM ${permissionsTable} 
        WHERE subject LIKE '%project%' OR subject = 'api::project.project'
        LIMIT 10
      `);
      console.table(permissions.rows);
    }

    // Check projects table structure
    console.log('\n📊 Projects Table Info:');
    const projectsInfo = await client.query<TableInfo>(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'projects' 
      ORDER BY ordinal_position
    `);
    console.table(projectsInfo.rows);

    // Count projects by locale
    console.log('\n🌐 Projects by Locale:');
    const projectsByLocale = await client.query(`
      SELECT locale, COUNT(*) as count, 
             COUNT(CASE WHEN published_at IS NOT NULL THEN 1 END) as published_count
      FROM projects 
      GROUP BY locale
      ORDER BY locale
    `);
    console.table(projectsByLocale.rows);

    // Check if AI user has proper permissions
    console.log('\n🤖 AI User Analysis:');
    const aiUser = adminUsers.rows.find((user: any) => user.email === 'ai@rate.box');
    if (aiUser) {
      console.log('✅ AI user found:', aiUser);
      
      // Try to create/update AI user permissions if needed
      if (rolesTable && permissionsTable) {
        console.log('\n🔧 Attempting to fix AI user permissions...');
        
        // Check if Super Admin role exists
        const superAdminRole = await client.query(`
          SELECT id FROM ${rolesTable} 
          WHERE code = 'strapi-super-admin' OR name LIKE '%Super Admin%'
          LIMIT 1
        `);
        
        if (superAdminRole.rows.length > 0) {
          const roleId = superAdminRole.rows[0].id;
          console.log(`✅ Found Super Admin role with ID: ${roleId}`);
          
          // Check if user-role link exists
          const userRoleLinks = await client.query(`
            SELECT table_name FROM information_schema.tables 
            WHERE table_name LIKE '%user%role%' OR table_name LIKE '%admin_users%'
          `);
          console.table(userRoleLinks.rows);
        }
      }
    } else {
      console.log('❌ AI user not found!');
    }

    console.log('\n💡 NEXT STEPS:');
    console.log('1. 🌐 Open browser: http://localhost:1338/admin');
    console.log('2. 🔐 Login with: ai@rate.box / Y--BFZr!D6gu');
    console.log('3. 🔧 Go to Settings → Roles → Super Admin');
    console.log('4. ✅ Ensure "Content Manager" permissions are enabled');
    console.log('5. 🔄 Clear browser cache and try again');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

// Run the fix
fixAdminPermissions().catch(console.error); 