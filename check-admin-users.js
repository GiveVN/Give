const { Client } = require('pg');

async function checkAdminUsers() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'give',
    user: 'JOY',
    password: 'J8p!x2wqZs7vQ4rL'
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Check admin users
    const adminQuery = `
      SELECT id, firstname, lastname, username, email, is_active, blocked
      FROM admin_users 
      ORDER BY id;
    `;

    const admins = await client.query(adminQuery);
    console.log('\n📋 Admin users:');
    admins.rows.forEach(admin => {
      const status = admin.is_active && !admin.blocked ? 'ACTIVE' : 'INACTIVE';
      console.log(`- ID ${admin.id}: ${admin.firstname} ${admin.lastname} (${admin.username}) - ${admin.email} - ${status}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed');
  }
}

checkAdminUsers(); 