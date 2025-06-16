import { Client } from 'pg';

async function fixProjectsFinal() {
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

    // Check current structure
    console.log('\n🔍 CURRENT STRUCTURE:');
    const currentCols = await client.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'projects' 
      ORDER BY ordinal_position;
    `);
    console.log('Current columns:', currentCols.rows.map(r => r.column_name));

    // Add missing columns one by one
    console.log('\n🔧 ADDING MISSING COLUMNS...');
    
    // Check and add locale
    const hasLocale = currentCols.rows.some(r => r.column_name === 'locale');
    if (!hasLocale) {
      await client.query(`ALTER TABLE projects ADD COLUMN locale character varying(255) DEFAULT 'en';`);
      console.log('✅ Added locale column');
    } else {
      console.log('⚠️ locale column already exists');
    }

    // Check and add published_at
    const hasPublishedAt = currentCols.rows.some(r => r.column_name === 'published_at');
    if (!hasPublishedAt) {
      await client.query(`ALTER TABLE projects ADD COLUMN published_at timestamp without time zone;`);
      console.log('✅ Added published_at column');
    } else {
      console.log('⚠️ published_at column already exists');
    }

    // Check and add updated_at
    const hasUpdatedAt = currentCols.rows.some(r => r.column_name === 'updated_at');
    if (!hasUpdatedAt) {
      await client.query(`ALTER TABLE projects ADD COLUMN updated_at timestamp without time zone;`);
      console.log('✅ Added updated_at column');
    } else {
      console.log('⚠️ updated_at column already exists');
    }

    // Check and add created_by_id
    const hasCreatedBy = currentCols.rows.some(r => r.column_name === 'created_by_id');
    if (!hasCreatedBy) {
      await client.query(`ALTER TABLE projects ADD COLUMN created_by_id integer;`);
      console.log('✅ Added created_by_id column');
    } else {
      console.log('⚠️ created_by_id column already exists');
    }

    // Check and add updated_by_id
    const hasUpdatedBy = currentCols.rows.some(r => r.column_name === 'updated_by_id');
    if (!hasUpdatedBy) {
      await client.query(`ALTER TABLE projects ADD COLUMN updated_by_id integer;`);
      console.log('✅ Added updated_by_id column');
    } else {
      console.log('⚠️ updated_by_id column already exists');
    }

    // Update all projects with proper values
    console.log('\n📝 UPDATING PROJECT DATA...');
    const updateResult = await client.query(`
      UPDATE projects 
      SET 
        locale = COALESCE(locale, 'en'),
        published_at = COALESCE(published_at, created_at, NOW()),
        updated_at = COALESCE(updated_at, created_at, NOW()),
        created_by_id = COALESCE(created_by_id, 1),
        updated_by_id = COALESCE(updated_by_id, 1)
      WHERE 
        locale IS NULL OR locale = '' OR
        published_at IS NULL OR
        updated_at IS NULL OR
        created_by_id IS NULL OR
        updated_by_id IS NULL;
    `);
    console.log(`✅ Updated ${updateResult.rowCount} projects`);

    // Check final structure
    console.log('\n🔍 FINAL STRUCTURE:');
    const finalCols = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'projects' 
      ORDER BY ordinal_position;
    `);
    console.table(finalCols.rows);

    // Check projects data
    console.log('\n📊 PROJECTS DATA:');
    const projectsData = await client.query(`
      SELECT id, document_id, title, locale, published_at, created_by_id
      FROM projects 
      ORDER BY id;
    `);
    console.table(projectsData.rows);

    console.log('\n✅ SCHEMA FIX COMPLETED!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

fixProjectsFinal().catch(console.error); 