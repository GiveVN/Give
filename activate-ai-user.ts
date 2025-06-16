import { Client } from 'pg';

async function activateAiUser(): Promise<void> {
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

    // Check current AI user status
    console.log('\\n👤 Current AI user status:');
    const currentUser = await client.query(`
      SELECT id, username, email, blocked, is_active 
      FROM admin_users 
      WHERE email = 'ai@rate.box'
    `);
    
    if (currentUser.rows.length === 0) {
      console.log('❌ AI user not found!');
      return;
    }
    
    console.table(currentUser.rows);
    
    // Activate the user
    console.log('\\n🔧 Activating AI user...');
    const updateResult = await client.query(`
      UPDATE admin_users 
      SET blocked = false, is_active = true
      WHERE email = 'ai@rate.box'
      RETURNING id, username, email, blocked, is_active
    `);
    
    console.log('✅ User updated:');
    console.table(updateResult.rows);
    
    // Also check if user has super admin role
    console.log('\\n🔐 Checking user roles...');
    const userRoles = await client.query(`
      SELECT ar.name as role_name, ar.code as role_code
      FROM admin_users au
      JOIN admin_users_roles_links aurl ON au.id = aurl.user_id
      JOIN admin_roles ar ON aurl.role_id = ar.id
      WHERE au.email = 'ai@rate.box'
    `);
    
    if (userRoles.rows.length === 0) {
      console.log('⚠️ User has no roles assigned!');
      
      // Get super admin role ID
      const superAdminRole = await client.query(`
        SELECT id FROM admin_roles WHERE code = 'strapi-super-admin'
      `);
      
      if (superAdminRole.rows.length > 0) {
        const userId = currentUser.rows[0].id;
        const roleId = superAdminRole.rows[0].id;
        
        console.log(`🔧 Assigning super admin role (${roleId}) to user (${userId})...`);
        
        await client.query(`
          INSERT INTO admin_users_roles_links (user_id, role_id)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING
        `, [userId, roleId]);
        
        console.log('✅ Super admin role assigned!');
      }
    } else {
      console.log('✅ User roles:');
      console.table(userRoles.rows);
    }

  } catch (error) {
    console.error('💥 Error:', error);
  } finally {
    await client.end();
  }
}

activateAiUser().catch(console.error); 