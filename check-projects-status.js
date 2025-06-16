const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'JOY',
  password: 'J8p!x2wqZs7vQ4rL',
  database: 'give'
});

async function checkAndFixProjects() {
  try {
    await client.connect();
    console.log('🔗 Connected to database');

    // Check current status
    console.log('\n📊 Current Projects Status:');
    const checkQuery = `
      SELECT 
        id,
        document_id,
        title,
        CASE WHEN description IS NULL OR description = '' THEN 'Missing' ELSE 'OK' END as desc_status,
        CASE WHEN category IS NULL THEN 'Missing' ELSE category END as category_status,
        CASE WHEN project_status IS NULL THEN 'Missing' ELSE project_status END as status,
        CASE WHEN funding_goal IS NULL OR funding_goal <= 0 THEN 'Missing/Invalid' ELSE funding_goal::text END as funding_goal,
        CASE WHEN currency IS NULL THEN 'Missing' ELSE currency END as currency_status,
        CASE WHEN start_date IS NULL THEN 'Missing' ELSE 'OK' END as start_date_status,
        CASE WHEN end_date IS NULL THEN 'Missing' ELSE 'OK' END as end_date_status,
        published_at
      FROM projects 
      ORDER BY created_at DESC;
    `;
    
    const result = await client.query(checkQuery);
    console.table(result.rows);

    // Fix missing descriptions
    console.log('\n🔧 Fixing missing descriptions...');
    const fixDescQuery = `
      UPDATE projects 
      SET description = CONCAT('Mô tả chi tiết cho dự án "', COALESCE(title, 'Untitled'), '". Đây là một dự án crowdfunding nhằm gây quỹ cho mục đích tốt đẹp, mang lại giá trị tích cực cho cộng đồng và xã hội.'),
          updated_at = NOW()
      WHERE description IS NULL OR description = '';
    `;
    const descResult = await client.query(fixDescQuery);
    console.log(`✅ Updated ${descResult.rowCount} projects with descriptions`);

    // Fix missing categories
    console.log('\n🔧 Fixing missing categories...');
    const fixCatQuery = `
      UPDATE projects 
      SET category = 'community',
          updated_at = NOW()
      WHERE category IS NULL;
    `;
    const catResult = await client.query(fixCatQuery);
    console.log(`✅ Updated ${catResult.rowCount} projects with categories`);

    // Fix missing projectStatus
    console.log('\n🔧 Fixing missing project status...');
    const fixStatusQuery = `
      UPDATE projects 
      SET project_status = 'active',
          updated_at = NOW()
      WHERE project_status IS NULL;
    `;
    const statusResult = await client.query(fixStatusQuery);
    console.log(`✅ Updated ${statusResult.rowCount} projects with status`);

    // Fix missing fundingGoal
    console.log('\n🔧 Fixing missing funding goals...');
    const fixGoalQuery = `
      UPDATE projects 
      SET funding_goal = 50000000,
          updated_at = NOW()
      WHERE funding_goal IS NULL OR funding_goal <= 0;
    `;
    const goalResult = await client.query(fixGoalQuery);
    console.log(`✅ Updated ${goalResult.rowCount} projects with funding goals`);

    // Fix missing currency
    console.log('\n🔧 Fixing missing currency...');
    const fixCurrQuery = `
      UPDATE projects 
      SET currency = 'VND',
          updated_at = NOW()
      WHERE currency IS NULL;
    `;
    const currResult = await client.query(fixCurrQuery);
    console.log(`✅ Updated ${currResult.rowCount} projects with currency`);

    // Fix missing dates
    console.log('\n🔧 Fixing missing dates...');
    const fixDatesQuery = `
      UPDATE projects 
      SET start_date = COALESCE(start_date, '2025-01-01 00:00:00'),
          end_date = COALESCE(end_date, '2025-12-31 23:59:59'),
          updated_at = NOW()
      WHERE start_date IS NULL OR end_date IS NULL;
    `;
    const datesResult = await client.query(fixDatesQuery);
    console.log(`✅ Updated ${datesResult.rowCount} projects with dates`);

    // Fix other optional fields
    console.log('\n🔧 Fixing optional fields...');
    const fixOptionalQuery = `
      UPDATE projects 
      SET 
        current_funding = COALESCE(current_funding, 0),
        backers_count = COALESCE(backers_count, 0),
        featured = COALESCE(featured, false),
        updated_at = NOW()
      WHERE current_funding IS NULL OR backers_count IS NULL OR featured IS NULL;
    `;
    const optionalResult = await client.query(fixOptionalQuery);
    console.log(`✅ Updated ${optionalResult.rowCount} projects with optional fields`);

    // Final verification
    console.log('\n✅ Final Status Check:');
    const finalResult = await client.query(checkQuery);
    console.table(finalResult.rows);

    // Count summary
    console.log('\n📈 Summary:');
    const summaryQuery = `
      SELECT 
        'Total Projects' as metric,
        COUNT(*) as count
      FROM projects
      UNION ALL
      SELECT 
        'Published Projects' as metric,
        COUNT(*) as count
      FROM projects 
      WHERE published_at IS NOT NULL
      UNION ALL
      SELECT 
        'Draft Projects' as metric,
        COUNT(*) as count
      FROM projects 
      WHERE published_at IS NULL;
    `;
    const summaryResult = await client.query(summaryQuery);
    console.table(summaryResult.rows);

    console.log('\n🎉 All projects should now be ready for publishing!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

checkAndFixProjects(); 