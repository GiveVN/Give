const { Client } = require('pg');

async function checkProjectsTable() {
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

    // Check table structure
    const structureQuery = `
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'projects'
      ORDER BY ordinal_position;
    `;

    const structure = await client.query(structureQuery);
    console.log('\n📋 Projects table structure:');
    structure.rows.forEach(col => {
      console.log(`- ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
    });

    // Show all projects with basic info
    const selectQuery = `
      SELECT id, title, published_at, created_at, updated_at
      FROM projects 
      ORDER BY id;
    `;

    const projects = await client.query(selectQuery);
    console.log('\n📋 All projects:');
    projects.rows.forEach(project => {
      const status = project.published_at ? 'PUBLISHED' : 'DRAFT';
      console.log(`- ID ${project.id}: "${project.title}" - ${status}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed');
  }
}

checkProjectsTable(); 