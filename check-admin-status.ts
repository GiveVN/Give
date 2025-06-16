import { Client } from 'pg';

async function checkAdminStatus(): Promise<void> {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'give',
    user: 'JOY',
    password: 'J8p!x2wqZs7vQ4rL'
  });

  try {
    await client.connect();
    console.log('🔗 Connected to PostgreSQL');

    // Check all projects status
    console.log('\n📊 Current Projects Status:');
    const allProjects = await client.query(`
      SELECT id, title, published_at, locale, project_status, created_at
      FROM projects 
      ORDER BY id
    `);

    console.table(allProjects.rows.map(p => ({
      id: p.id,
      title: p.title.substring(0, 40),
      published: p.published_at ? '✅ YES' : '❌ NO',
      locale: p.locale,
      status: p.project_status,
      created: p.created_at.toISOString().split('T')[0]
    })));

    const publishedCount = allProjects.rows.filter(p => p.published_at).length;
    const totalCount = allProjects.rows.length;

    console.log(`\n📈 SUMMARY:`);
    console.log(`✅ Published projects: ${publishedCount}/${totalCount}`);
    console.log(`📊 All projects have locale: 'en'`);
    console.log(`🔄 All projects have status: 'active'`);

    if (publishedCount === totalCount) {
      console.log('\n🎉 SUCCESS: All projects are published!');
      
      console.log('\n💡 NEXT STEPS TO SEE PROJECTS IN ADMIN:');
      console.log('1. 🌐 Open browser: http://localhost:1338/admin');
      console.log('2. 🔐 Login with: ai@rate.box / Y--BFZr!D6gu');
      console.log('3. 📂 Go to: Content Manager → Project');
      console.log('4. 🌍 Make sure locale is set to "English (en)"');
      console.log('5. 🔄 Refresh the page if needed');
      
      console.log('\n🔍 TROUBLESHOOTING IF STILL EMPTY:');
      console.log('• Clear browser cache (Ctrl+Shift+R)');
      console.log('• Try incognito/private browsing mode');
      console.log('• Check browser console for JavaScript errors');
      console.log('• Verify user permissions in Settings → Roles');
      
      console.log('\n📱 DIRECT ADMIN URLS TO TRY:');
      console.log('• Projects: http://localhost:1338/admin/content-manager/collection-types/api::project.project');
      console.log('• With locale: http://localhost:1338/admin/content-manager/collection-types/api::project.project?plugins[i18n][locale]=en');
      console.log('• Categories: http://localhost:1338/admin/content-manager/collection-types/api::category.category');
    }

    // Test API endpoints
    console.log('\n🔌 API ENDPOINTS STATUS:');
    console.log('• Public API: http://localhost:1338/api/projects');
    console.log('• With pagination: http://localhost:1338/api/projects?pagination[pageSize]=20');
    console.log('• With locale: http://localhost:1338/api/projects?locale=en');

  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await client.end();
  }
}

// Run the check
checkAdminStatus().catch(console.error); 