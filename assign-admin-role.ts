import { Client } from 'pg';

async function assignAdminRole(): Promise<void> {
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

    // Get AI user ID
    const aiUserResult = await client.query(`
      SELECT id FROM admin_users WHERE email = 'ai@rate.box'
    `);
    
    if (aiUserResult.rows.length === 0) {
      console.log('❌ AI user not found!');
      return;
    }
    
    const aiUserId = aiUserResult.rows[0].id;
    console.log(`✅ AI User ID: ${aiUserId}`);

    // Get Super Admin role ID
    const superAdminResult = await client.query(`
      SELECT id FROM admin_roles WHERE code = 'strapi-super-admin'
    `);
    
    if (superAdminResult.rows.length === 0) {
      console.log('❌ Super Admin role not found!');
      return;
    }
    
    const superAdminRoleId = superAdminResult.rows[0].id;
    console.log(`✅ Super Admin Role ID: ${superAdminRoleId}`);

    // Check if assignment already exists
    const existingAssignment = await client.query(`
      SELECT * FROM admin_users_roles_lnk 
      WHERE user_id = $1 AND role_id = $2
    `, [aiUserId, superAdminRoleId]);

    if (existingAssignment.rows.length > 0) {
      console.log('✅ AI user already has Super Admin role assigned');
    } else {
      // Assign Super Admin role to AI user
      console.log('🔧 Assigning Super Admin role to AI user...');
      await client.query(`
        INSERT INTO admin_users_roles_lnk (user_id, role_id, user_ord, role_ord)
        VALUES ($1, $2, 1, 1)
      `, [aiUserId, superAdminRoleId]);
      console.log('✅ Super Admin role assigned successfully!');
    }

    // Verify the assignment
    console.log('\n🔍 Verifying role assignments:');
    const roleAssignments = await client.query(`
      SELECT au.username, au.email, ar.name as role_name, ar.code as role_code
      FROM admin_users au
      JOIN admin_users_roles_lnk aurl ON au.id = aurl.user_id
      JOIN admin_roles ar ON aurl.role_id = ar.id
      ORDER BY au.id
    `);
    console.table(roleAssignments.rows);

    // Check specific permissions for AI user
    console.log('\n🔑 AI User Permissions for Projects:');
    const aiPermissions = await client.query(`
      SELECT DISTINCT ap.action, ap.subject
      FROM admin_permissions ap
      JOIN admin_permissions_role_lnk aprl ON ap.id = aprl.permission_id
      JOIN admin_roles ar ON aprl.role_id = ar.id
      JOIN admin_users_roles_lnk aurl ON ar.id = aurl.role_id
      JOIN admin_users au ON aurl.user_id = au.id
      WHERE au.email = 'ai@rate.box' 
      AND (ap.subject LIKE '%project%' OR ap.subject = 'api::project.project')
      ORDER BY ap.action, ap.subject
    `);
    console.table(aiPermissions.rows);

    console.log('\n🎉 ROLE ASSIGNMENT COMPLETE!');
    console.log('📋 Next steps:');
    console.log('1. 🌐 Open: http://localhost:1338/admin');
    console.log('2. 🔐 Login: ai@rate.box / Y--BFZr!D6gu');
    console.log('3. 🔄 Clear browser cache (Ctrl+Shift+Delete)');
    console.log('4. 📊 Navigate to Content Manager → Project');
    console.log('5. ✅ Projects should now be visible!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

// Run the assignment
assignAdminRole().catch(console.error); 