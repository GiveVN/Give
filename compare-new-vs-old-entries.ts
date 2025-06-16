import { Client } from 'pg';

async function compareNewVsOldEntries() {
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

    // 1. Find the newest entry (just created)
    console.log('\n🆕 NEWEST ENTRY (JUST CREATED):');
    const newestEntry = await client.query(`
      SELECT id, document_id, title, locale, published_at, created_at, updated_at, 
             created_by_id, updated_by_id, project_status
      FROM projects 
      ORDER BY created_at DESC 
      LIMIT 1;
    `);
    console.table(newestEntry.rows);

    // 2. Compare with older entries
    console.log('\n📊 ALL ENTRIES COMPARISON:');
    const allEntries = await client.query(`
      SELECT id, document_id, title, locale, published_at, created_at, updated_at,
             created_by_id, updated_by_id, project_status,
             CASE 
               WHEN created_at = (SELECT MAX(created_at) FROM projects) THEN '🆕 NEW'
               ELSE '🔸 OLD'
             END as entry_type
      FROM projects 
      ORDER BY created_at DESC;
    `);
    console.table(allEntries.rows);

    // 3. Check specific differences
    console.log('\n🔍 KEY DIFFERENCES ANALYSIS:');
    
    const newEntry = newestEntry.rows[0];
    const oldEntries = await client.query(`
      SELECT id, document_id, title, locale, published_at, created_at, updated_at,
             created_by_id, updated_by_id, project_status
      FROM projects 
      WHERE created_at < $1
      ORDER BY created_at DESC 
      LIMIT 3;
    `, [newEntry.created_at]);

    console.log('\n🆕 NEW ENTRY CHARACTERISTICS:');
    console.log(`- Document ID: ${newEntry.document_id}`);
    console.log(`- Title: ${newEntry.title}`);
    console.log(`- Locale: ${newEntry.locale}`);
    console.log(`- Published At: ${newEntry.published_at}`);
    console.log(`- Created By ID: ${newEntry.created_by_id}`);
    console.log(`- Updated By ID: ${newEntry.updated_by_id}`);
    console.log(`- Project Status: ${newEntry.project_status}`);

    console.log('\n🔸 OLD ENTRIES SAMPLE:');
    oldEntries.rows.forEach((entry, index) => {
      console.log(`\n--- OLD ENTRY ${index + 1} ---`);
      console.log(`- Document ID: ${entry.document_id}`);
      console.log(`- Title: ${entry.title}`);
      console.log(`- Locale: ${entry.locale}`);
      console.log(`- Published At: ${entry.published_at}`);
      console.log(`- Created By ID: ${entry.created_by_id}`);
      console.log(`- Updated By ID: ${entry.updated_by_id}`);
      console.log(`- Project Status: ${entry.project_status}`);
    });

    // 4. Check if new entry appears in API
    console.log('\n🌐 API VISIBILITY CHECK:');
    console.log('Checking if new entry appears in Strapi API...');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

compareNewVsOldEntries(); 