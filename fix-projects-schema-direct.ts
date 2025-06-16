import { Client } from 'pg';

async function fixProjectsSchemaDirectly() {
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

    console.log('\n🔧 ADDING MISSING COLUMNS TO PROJECTS TABLE...');
    
    // Add all missing columns in one go
    await client.query(`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS locale character varying(255) DEFAULT 'en',
      ADD COLUMN IF NOT EXISTS published_at timestamp without time zone DEFAULT NOW(),
      ADD COLUMN IF NOT EXISTS created_by_id integer DEFAULT 1,
      ADD COLUMN IF NOT EXISTS updated_by_id integer DEFAULT 1,
      ADD COLUMN IF NOT EXISTS updated_at timestamp without time zone DEFAULT NOW();
    `);
    console.log('✅ Added all missing columns');

    // Update existing records
    console.log('\n📝 UPDATING EXISTING RECORDS...');
    
    const updateResult = await client.query(`
      UPDATE projects 
      SET 
        locale = COALESCE(locale, 'en'),
        published_at = COALESCE(published_at, created_at, NOW()),
        created_by_id = COALESCE(created_by_id, 1),
        updated_by_id = COALESCE(updated_by_id, 1),
        updated_at = COALESCE(updated_at, created_at, NOW())
      WHERE locale IS NULL OR published_at IS NULL OR created_by_id IS NULL;
    `);
    console.log(`✅ Updated ${updateResult.rowCount} records`);

    // Check final structure
    console.log('\n🔍 FINAL PROJECTS TABLE STRUCTURE:');
    const finalStructure = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'projects' 
      ORDER BY ordinal_position;
    `);
    console.table(finalStructure.rows);

    // Check projects data
    console.log('\n📊 PROJECTS DATA:');
    const projectsData = await client.query(`
      SELECT id, document_id, title, locale, published_at, created_by_id
      FROM projects 
      ORDER BY id
      LIMIT 5;
    `);
    console.table(projectsData.rows);

    console.log('\n✅ SCHEMA FIX COMPLETED!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

fixProjectsSchemaDirectly().catch(console.error); 