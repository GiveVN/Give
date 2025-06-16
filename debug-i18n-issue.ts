import { Client } from 'pg';

async function debugI18nIssue() {
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

    // 1. Check i18n_locale table
    console.log('\n🌐 I18N_LOCALE TABLE:');
    const locales = await client.query(`
      SELECT * FROM i18n_locale ORDER BY id;
    `);
    console.table(locales.rows);

    // 2. Check if projects have localization entries
    console.log('\n🔍 CHECKING FOR PROJECTS_LOCALIZATIONS TABLE:');
    const localizationTables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_name LIKE '%localization%'
      ORDER BY table_name;
    `);
    console.table(localizationTables.rows);

    // 3. Check projects table structure for i18n fields
    console.log('\n📋 PROJECTS TABLE I18N FIELDS:');
    const projectFields = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'projects' 
        AND column_name IN ('locale', 'published_at', 'document_id')
      ORDER BY column_name;
    `);
    console.table(projectFields.rows);

    // 4. Check if there are any projects with different locales
    console.log('\n🔍 PROJECTS BY LOCALE:');
    const projectsByLocale = await client.query(`
      SELECT locale, COUNT(*) as count
      FROM projects 
      GROUP BY locale
      ORDER BY locale;
    `);
    console.table(projectsByLocale.rows);

    // 5. Check if there's a projects_localizations table (Strapi 4 style)
    console.log('\n🔍 CHECKING PROJECTS_LOCALIZATIONS TABLE:');
    try {
      const localizationsCheck = await client.query(`
        SELECT COUNT(*) as count FROM projects_localizations;
      `);
      console.log('✅ projects_localizations table exists with', localizationsCheck.rows[0].count, 'entries');
      
      const localizationsData = await client.query(`
        SELECT * FROM projects_localizations LIMIT 5;
      `);
      console.table(localizationsData.rows);
    } catch (error) {
      console.log('❌ projects_localizations table does not exist');
    }

    // 6. Check Strapi core_store for i18n config
    console.log('\n⚙️ STRAPI I18N CONFIGURATION:');
    const i18nConfig = await client.query(`
      SELECT key, value 
      FROM strapi_core_store_settings 
      WHERE key LIKE '%i18n%' OR key LIKE '%locale%'
      ORDER BY key;
    `);
    console.table(i18nConfig.rows);

    // 7. Test a direct query that Strapi admin might use
    console.log('\n🧪 SIMULATING STRAPI ADMIN QUERY WITH LOCALE FILTER:');
    const adminSimulation = await client.query(`
      SELECT id, document_id, title, locale, published_at
      FROM projects 
      WHERE locale = 'en' 
        AND published_at IS NOT NULL
      ORDER BY title ASC
      LIMIT 5;
    `);
    console.log(`Found ${adminSimulation.rows.length} projects with locale='en':`);
    console.table(adminSimulation.rows);

    // 8. Check if document_id is unique (Strapi 5 requirement)
    console.log('\n🆔 DOCUMENT_ID UNIQUENESS CHECK:');
    const documentIdCheck = await client.query(`
      SELECT document_id, COUNT(*) as count
      FROM projects 
      GROUP BY document_id
      HAVING COUNT(*) > 1;
    `);
    if (documentIdCheck.rows.length > 0) {
      console.log('⚠️ Found duplicate document_ids:');
      console.table(documentIdCheck.rows);
    } else {
      console.log('✅ All document_ids are unique');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

debugI18nIssue(); 