import { Client } from 'pg';

async function fixAdminProjectPermissions() {
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

    // 1. Get Super Admin role ID
    console.log('\n🔍 FINDING SUPER ADMIN ROLE...');
    const superAdminRole = await client.query(`
      SELECT id, name, code FROM admin_roles WHERE code = 'strapi-super-admin';
    `);
    
    if (superAdminRole.rows.length === 0) {
      console.error('❌ Super Admin role not found!');
      return;
    }
    
    const roleId = superAdminRole.rows[0].id;
    console.log(`✅ Found Super Admin role: ID ${roleId}`);

    // 2. Check existing project permissions
    console.log('\n🔍 CHECKING EXISTING PROJECT PERMISSIONS...');
    const existingPerms = await client.query(`
      SELECT ap.id, ap.action, ap.subject 
      FROM admin_permissions ap
      LEFT JOIN admin_permissions_role_lnk aprl ON ap.id = aprl.permission_id
      WHERE aprl.role_id = $1 AND ap.subject LIKE '%project%';
    `, [roleId]);
    
    console.log(`Found ${existingPerms.rows.length} existing project permissions`);
    console.table(existingPerms.rows);

    // 3. Define required permissions for projects
    const requiredPermissions = [
      { action: 'plugin::content-manager.explorer.create', subject: 'api::project.project' },
      { action: 'plugin::content-manager.explorer.read', subject: 'api::project.project' },
      { action: 'plugin::content-manager.explorer.update', subject: 'api::project.project' },
      { action: 'plugin::content-manager.explorer.delete', subject: 'api::project.project' },
      { action: 'plugin::content-manager.explorer.publish', subject: 'api::project.project' },
      { action: 'plugin::content-manager.single-types.configure-view', subject: 'api::project.project' },
      { action: 'plugin::content-manager.collection-types.configure-view', subject: 'api::project.project' },
    ];

    // 4. Add missing permissions
    console.log('\n➕ ADDING MISSING PERMISSIONS...');
    
    for (const perm of requiredPermissions) {
      // Check if permission already exists
      const existingPerm = await client.query(`
        SELECT ap.id FROM admin_permissions ap
        LEFT JOIN admin_permissions_role_lnk aprl ON ap.id = aprl.permission_id
        WHERE aprl.role_id = $1 AND ap.action = $2 AND ap.subject = $3;
      `, [roleId, perm.action, perm.subject]);

      if (existingPerm.rows.length === 0) {
        // Create permission
        const newPerm = await client.query(`
          INSERT INTO admin_permissions (action, subject, properties, conditions, created_at, updated_at)
          VALUES ($1, $2, '{}', '[]', NOW(), NOW())
          RETURNING id;
        `, [perm.action, perm.subject]);

        const permissionId = newPerm.rows[0].id;

        // Link permission to role
        await client.query(`
          INSERT INTO admin_permissions_role_lnk (permission_id, role_id, permission_ord)
          VALUES ($1, $2, 1);
        `, [permissionId, roleId]);

        console.log(`✅ Added: ${perm.action} for ${perm.subject}`);
      } else {
        console.log(`⚠️ Already exists: ${perm.action} for ${perm.subject}`);
      }
    }

    // 5. Verify final permissions
    console.log('\n✅ FINAL PROJECT PERMISSIONS:');
    const finalPerms = await client.query(`
      SELECT ap.id, ap.action, ap.subject 
      FROM admin_permissions ap
      LEFT JOIN admin_permissions_role_lnk aprl ON ap.id = aprl.permission_id
      WHERE aprl.role_id = $1 AND ap.subject LIKE '%project%'
      ORDER BY ap.action;
    `, [roleId]);
    
    console.table(finalPerms.rows);
    console.log(`\n🎉 Total project permissions: ${finalPerms.rows.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

fixAdminProjectPermissions().catch(console.error); 