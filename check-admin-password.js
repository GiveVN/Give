const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function checkAndResetAdminPassword() {
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

    // Check current admin password hash
    const checkQuery = `
      SELECT id, email, password
      FROM admin_users 
      WHERE email = 'joy@joy.vn';
    `;

    const result = await client.query(checkQuery);
    if (result.rows.length === 0) {
      console.log('❌ Admin user not found');
      return;
    }

    const admin = result.rows[0];
    console.log(`\n📋 Admin found: ${admin.email} (ID: ${admin.id})`);

    // Test current password
    const currentPassword = 'admin123';
    const isCurrentValid = await bcrypt.compare(currentPassword, admin.password);
    console.log(`Current password "${currentPassword}" valid: ${isCurrentValid}`);

    if (!isCurrentValid) {
      // Generate new password hash
      const newPassword = 'admin123';
      const saltRounds = 10;
      const newHash = await bcrypt.hash(newPassword, saltRounds);
      
      console.log(`\n🔄 Updating password to: ${newPassword}`);
      
      const updateQuery = `
        UPDATE admin_users 
        SET password = $1, updated_at = NOW()
        WHERE id = $2;
      `;

      await client.query(updateQuery, [newHash, admin.id]);
      console.log('✅ Password updated successfully');
      
      // Verify new password
      const verifyValid = await bcrypt.compare(newPassword, newHash);
      console.log(`New password verification: ${verifyValid}`);
    } else {
      console.log('✅ Current password is already correct');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed');
  }
}

checkAndResetAdminPassword(); 