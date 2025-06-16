const { Client } = require('pg');

async function checkCurrentStatus() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'give',
    user: 'JOY',
    password: 'J8p!x2wqZs7vQ4rL'
  });

  try {
    await client.connect();
    console.log('🔍 KIỂM TRA TÌNH HÌNH HIỆN TẠI:');
    
    const result = await client.query(`
      SELECT id, document_id, title, created_by_id, updated_by_id, created_at, published_at
      FROM projects 
      ORDER BY created_at DESC;
    `);
    
    console.table(result.rows);
    
    console.log('\n📊 THỐNG KÊ:');
    const total = result.rows.length;
    const byUser1 = result.rows.filter(r => r.created_by_id === 1).length;
    const byUser2 = result.rows.filter(r => r.created_by_id === 2).length;
    console.log(`📈 Tổng projects: ${total}`);
    console.log(`👤 User 1 (bạn): ${byUser1} projects`);
    console.log(`🤖 User 2 (AI): ${byUser2} projects`);
    
    console.log('\n🔍 PROJECTS CỦA BẠN (User 1):');
    const yourProjects = result.rows.filter(r => r.created_by_id === 1);
    yourProjects.forEach(p => console.log(`- ID ${p.id}: ${p.title} (${p.document_id})`));
    
    console.log('\n🔍 PROJECTS CỦA AI (User 2):');
    const aiProjects = result.rows.filter(r => r.created_by_id === 2);
    aiProjects.forEach(p => console.log(`- ID ${p.id}: ${p.title} (${p.document_id})`));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

checkCurrentStatus(); 