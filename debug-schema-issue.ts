import { Client } from 'pg';

async function debugSchemaIssue() {
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

    // 1. Check projects table structure
    console.log('\n🔍 PROJECTS TABLE STRUCTURE:');
    const projectsStructure = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'projects' 
      ORDER BY ordinal_position;
    `);
    console.table(projectsStructure.rows);

    // 2. Check projects_localizations table
    console.log('\n🔍 PROJECTS_LOCALIZATIONS TABLE:');
    const localizationsStructure = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'projects_localizations' 
      ORDER BY ordinal_position;
    `);
    console.table(localizationsStructure.rows);

    // 3. Check actual projects data with localization
    console.log('\n📊 PROJECTS WITH LOCALIZATION DATA:');
    const projectsData = await client.query(`
      SELECT 
        p.id,
        p.document_id,
        p.title,
        p.locale,
        p.published_at,
        pl.locale as loc_locale,
        pl.title as loc_title
      FROM projects p
      LEFT JOIN projects_localizations pl ON p.document_id = pl.document_id
      ORDER BY p.id;
    `);
    console.table(projectsData.rows);

    // 4. Check i18n_locale table
    console.log('\n🌐 I18N_LOCALE TABLE:');
    const locales = await client.query(`
      SELECT * FROM i18n_locale ORDER BY id;
    `);
    console.table(locales.rows);

    // 5. Check for any schema inconsistencies
    console.log('\n⚠️ POTENTIAL SCHEMA ISSUES:');
    
    // Check for projects without proper locale
    const noLocaleProjects = await client.query(`
      SELECT id, document_id, title, locale 
      FROM projects 
      WHERE locale IS NULL OR locale = '';
    `);
    if (noLocaleProjects.rows.length > 0) {
      console.log('❌ Projects without proper locale:');
      console.table(noLocaleProjects.rows);
    } else {
      console.log('✅ All projects have proper locale');
    }

    // Check for projects without published_at
    const unpublishedProjects = await client.query(`
      SELECT id, document_id, title, published_at 
      FROM projects 
      WHERE published_at IS NULL;
    `);
    if (unpublishedProjects.rows.length > 0) {
      console.log('❌ Unpublished projects:');
      console.table(unpublishedProjects.rows);
    } else {
      console.log('✅ All projects are published');
    }

    // Check for duplicate document_ids
    const duplicateDocIds = await client.query(`
      SELECT document_id, COUNT(*) as count
      FROM projects 
      GROUP BY document_id 
      HAVING COUNT(*) > 1;
    `);
    if (duplicateDocIds.rows.length > 0) {
      console.log('❌ Duplicate document_ids:');
      console.table(duplicateDocIds.rows);
    } else {
      console.log('✅ No duplicate document_ids');
    }

  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await client.end();
  }
}

debugSchemaIssue().catch(console.error); 