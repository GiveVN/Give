import { Client } from 'pg';

async function debugSchemaSimple() {
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

    // 1. List all tables
    console.log('\n📋 ALL TABLES:');
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.table(tables.rows);

    // 2. Check projects table structure
    console.log('\n🔍 PROJECTS TABLE STRUCTURE:');
    const projectsStructure = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'projects' 
      ORDER BY ordinal_position;
    `);
    console.table(projectsStructure.rows);

    // 3. Check projects data
    console.log('\n📊 PROJECTS DATA:');
    const projectsData = await client.query(`
      SELECT id, document_id, title, locale, published_at
      FROM projects 
      ORDER BY id;
    `);
    console.table(projectsData.rows);

    // 4. Check i18n_locale table
    console.log('\n🌐 I18N_LOCALE TABLE:');
    const locales = await client.query(`
      SELECT * FROM i18n_locale ORDER BY id;
    `);
    console.table(locales.rows);

  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await client.end();
  }
}

debugSchemaSimple().catch(console.error); 