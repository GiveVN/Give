import { Client } from 'pg';

interface Project {
  id: number;
  document_id: string;
  title: string;
  published_at: string | null;
  locale: string;
  project_status: string;
}

async function publishAllProjects(): Promise<void> {
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

    // Find all unpublished projects
    console.log('\n🔍 Finding unpublished projects...');
    const unpublishedProjects = await client.query<Project>(`
      SELECT id, document_id, title, published_at, locale, project_status
      FROM projects 
      WHERE published_at IS NULL
      ORDER BY id
    `);

    console.log(`\n📊 Found ${unpublishedProjects.rows.length} unpublished projects:`);
    console.table(unpublishedProjects.rows);

    if (unpublishedProjects.rows.length === 0) {
      console.log('✅ All projects are already published!');
      return;
    }

    // Publish all unpublished projects
    console.log('\n🚀 Publishing all unpublished projects...');
    const currentTimestamp = new Date().toISOString();
    
    for (const project of unpublishedProjects.rows) {
      console.log(`\n📝 Publishing project ID ${project.id}: "${project.title}"`);
      
      const updateResult = await client.query(`
        UPDATE projects 
        SET published_at = $1, updated_at = $1
        WHERE id = $2
      `, [currentTimestamp, project.id]);

      if (updateResult.rowCount && updateResult.rowCount > 0) {
        console.log(`✅ Successfully published project ID ${project.id}`);
      } else {
        console.log(`❌ Failed to publish project ID ${project.id}`);
      }
    }

    // Verify results
    console.log('\n🔍 Verifying published projects...');
    const allProjects = await client.query(`
      SELECT id, title, published_at, locale, project_status
      FROM projects 
      ORDER BY id
    `);

    console.log('\n📊 All Projects Status:');
    console.table(allProjects.rows.map(p => ({
      id: p.id,
      title: p.title.substring(0, 30) + '...',
      published: p.published_at ? 'YES' : 'NO',
      locale: p.locale,
      status: p.project_status
    })));

    // Count published vs unpublished
    const publishedCount = allProjects.rows.filter(p => p.published_at).length;
    const unpublishedCount = allProjects.rows.filter(p => !p.published_at).length;

    console.log('\n📈 Summary:');
    console.log(`✅ Published projects: ${publishedCount}`);
    console.log(`❌ Unpublished projects: ${unpublishedCount}`);
    console.log(`📊 Total projects: ${allProjects.rows.length}`);

    if (unpublishedCount === 0) {
      console.log('\n🎉 SUCCESS: All projects are now published!');
      console.log('💡 They should now appear in Strapi Admin interface.');
      console.log('🔄 You may need to refresh the admin page.');
    }

    // Test API endpoint
    console.log('\n🔌 Testing API endpoint...');
    try {
      const { spawn } = require('child_process');
      const testProcess = spawn('curl', ['-s', 'http://localhost:1338/api/projects?pagination[pageSize]=20']);
      
      testProcess.stdout.on('data', (data: Buffer) => {
        const response = data.toString();
        try {
          const parsed = JSON.parse(response);
          if (parsed.data && Array.isArray(parsed.data)) {
            console.log(`✅ API returns ${parsed.data.length} projects`);
            console.log(`📊 API Meta:`, parsed.meta);
          }
        } catch (e) {
          console.log('⚠️ API response not JSON:', response.substring(0, 100));
        }
      });

      testProcess.stderr.on('data', (data: Buffer) => {
        console.log('❌ API Error:', data.toString());
      });
    } catch (error) {
      console.log('⚠️ Could not test API directly');
    }

  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await client.end();
  }
}

// Run the script
publishAllProjects().catch(console.error); 