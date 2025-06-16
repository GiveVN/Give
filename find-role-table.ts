import { Client } from 'pg';

async function findRoleTable(): Promise<void> {
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

    // Find user-role tables
    console.log('\n🔍 Looking for user-role tables:');
    const userRoleTables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND (table_name LIKE '%user%role%' OR table_name LIKE '%role%user%' OR table_name LIKE '%admin%role%')
      ORDER BY table_name
    `);
    console.table(userRoleTables.rows);

    // Find all tables with 'link' in name
    console.log('\n🔗 Looking for link tables:');
    const linkTables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE '%link%'
      ORDER BY table_name
    `);
    console.table(linkTables.rows);

    // Check admin_users table structure
    console.log('\n👤 Admin users table structure:');
    const adminUsersColumns = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'admin_users' 
      ORDER BY ordinal_position
    `);
    console.table(adminUsersColumns.rows);

    // Check if there's a role_id column in admin_users
    const roleColumn = adminUsersColumns.rows.find(col => col.column_name.includes('role'));
    if (roleColumn) {
      console.log('\n✅ Found role column in admin_users:', roleColumn);
      
      // Update AI user directly with role_id
      console.log('\n🔧 Updating AI user with Super Admin role...');
      await client.query(`
        UPDATE admin_users 
        SET role_id = 1 
        WHERE email = 'ai@rate.box'
      `);
      console.log('✅ Updated AI user role!');
    } else {
      console.log('\n❌ No role column found in admin_users table');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

findRoleTable().catch(console.error); 