import { Client } from 'pg';

async function fixProjectsSchema() {
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

    // 1. Check current projects table structure
    console.log('\n🔍 CURRENT PROJECTS TABLE STRUCTURE:');
    const currentStructure = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'projects' 
      ORDER BY ordinal_position;
    `);
    console.table(currentStructure.rows);

    // 2. Add missing columns for i18n and draftAndPublish
    console.log('\n🔧 ADDING MISSING COLUMNS...');
    
    // Add locale column
    try {
      await client.query(`
        ALTER TABLE projects 
        ADD COLUMN IF NOT EXISTS locale character varying(255);
      `);
      console.log('✅ Added locale column');
    } catch (error) {
      console.log('⚠️ Locale column might already exist:', error.message);
    }

    // Add published_at column
    try {
      await client.query(`
        ALTER TABLE projects 
        ADD COLUMN IF NOT EXISTS published_at timestamp without time zone;
      `);
      console.log('✅ Added published_at column');
    } catch (error) {
      console.log('⚠️ published_at column might already exist:', error.message);
    }

    // Add created_by_id and updated_by_id columns
    try {
      await client.query(`
        ALTER TABLE projects 
        ADD COLUMN IF NOT EXISTS created_by_id integer,
        ADD COLUMN IF NOT EXISTS updated_by_id integer;
      `);
      console.log('✅ Added created_by_id and updated_by_id columns');
    } catch (error) {
      console.log('⚠️ created_by_id/updated_by_id columns might already exist:', error.message);
    }

    // 3. Update existing projects with default values
    console.log('\n📝 UPDATING EXISTING PROJECTS...');
    
    // Set default locale to 'en' for all projects
    const updateLocale = await client.query(`
      UPDATE projects 
      SET locale = 'en' 
      WHERE locale IS NULL OR locale = '';
    `);
    console.log(`✅ Updated ${updateLocale.rowCount} projects with locale 'en'`);

    // Set published_at to created_at for all projects (make them published)
    const updatePublished = await client.query(`
      UPDATE projects 
      SET published_at = created_at 
      WHERE published_at IS NULL;
    `);
    console.log(`✅ Published ${updatePublished.rowCount} projects`);

    // Set created_by_id and updated_by_id to admin user (ID 1)
    const updateCreatedBy = await client.query(`
      UPDATE projects 
      SET created_by_id = 1, updated_by_id = 1 
      WHERE created_by_id IS NULL;
    `);
    console.log(`✅ Updated ${updateCreatedBy.rowCount} projects with admin user`);

    // 4. Check final structure
    console.log('\n🔍 FINAL PROJECTS TABLE STRUCTURE:');
    const finalStructure = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'projects' 
      ORDER BY ordinal_position;
    `);
    console.table(finalStructure.rows);

    // 5. Check projects data
    console.log('\n📊 PROJECTS DATA AFTER FIX:');
    const projectsData = await client.query(`
      SELECT id, document_id, title, locale, published_at, created_by_id
      FROM projects 
      ORDER BY id;
    `);
    console.table(projectsData.rows);

    console.log('\n✅ SCHEMA FIX COMPLETED!');
    console.log('🔄 Please restart Strapi server to reload schema');

  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await client.end();
  }
}

fixProjectsSchema().catch(console.error); 