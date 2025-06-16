import { Client } from 'pg';

async function fixAiUserRole(): Promise<void> {
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
      SELECT * FROM admin_users_roles_links 
      WHERE user_id = $1 AND role_id = $2
    `, [aiUserId, superAdminRoleId]);

    if (existingAssignment.rows.length > 0) {
      console.log('✅ AI user already has Super Admin role!');
      return;
    }

    // Assign Super Admin role to AI user
    console.log('\n🔧 Assigning Super Admin role to AI user...');
    await client.query(`
      INSERT INTO admin_users_roles_links (user_id, role_id)
      VALUES ($1, $2)
    `, [aiUserId, superAdminRoleId]);

    console.log('✅ Successfully assigned Super Admin role to AI user!');

    // Verify the assignment
    console.log('\n🔍 Verifying assignment...');
    const verification = await client.query(`
      SELECT au.email, ar.name as role_name, ar.code as role_code
      FROM admin_users au
      JOIN admin_users_roles_links aurl ON au.id = aurl.user_id
      JOIN admin_roles ar ON aurl.role_id = ar.id
      WHERE au.email = 'ai@rate.box'
    `);
    
    console.table(verification.rows);

    console.log('\n🎉 SOLUTION COMPLETE!');
    console.log('Now try logging into Strapi admin with:');
    console.log('Email: ai@rate.box');
    console.log('Password: Y--BFZr!D6gu');
    console.log('You should now see all 9 projects in the admin interface!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

fixAiUserRole().catch(console.error); 