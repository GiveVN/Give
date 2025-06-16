import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';

async function fixDuplicateDocumentIds() {
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

    // 1. Find all duplicate document_ids
    console.log('\n🔍 FINDING DUPLICATE DOCUMENT_IDs:');
    const duplicates = await client.query(`
      SELECT document_id, array_agg(id) as project_ids, COUNT(*) as count
      FROM projects 
      GROUP BY document_id
      HAVING COUNT(*) > 1
      ORDER BY document_id;
    `);
    
    console.log(`Found ${duplicates.rows.length} duplicate document_ids:`);
    console.table(duplicates.rows);

    // 2. Fix each duplicate by generating new document_ids
    for (const duplicate of duplicates.rows) {
      const { document_id, project_ids } = duplicate;
      console.log(`\n🔧 Fixing duplicate document_id: ${document_id}`);
      console.log(`Projects with this document_id: ${project_ids}`);
      
      // Keep the first project with original document_id, update others
      const projectsToUpdate = project_ids.slice(1); // Skip first one
      
      for (const projectId of projectsToUpdate) {
        const newDocumentId = uuidv4().replace(/-/g, '').substring(0, 28); // Strapi style
        
        console.log(`  Updating project ID ${projectId}: ${document_id} → ${newDocumentId}`);
        
        await client.query(`
          UPDATE projects 
          SET document_id = $1, updated_at = NOW()
          WHERE id = $2;
        `, [newDocumentId, projectId]);
      }
    }

    // 3. Verify fix
    console.log('\n✅ VERIFICATION - CHECKING FOR REMAINING DUPLICATES:');
    const remainingDuplicates = await client.query(`
      SELECT document_id, COUNT(*) as count
      FROM projects 
      GROUP BY document_id
      HAVING COUNT(*) > 1;
    `);
    
    if (remainingDuplicates.rows.length === 0) {
      console.log('🎉 SUCCESS! All document_ids are now unique!');
    } else {
      console.log('⚠️ Still have duplicates:');
      console.table(remainingDuplicates.rows);
    }

    // 4. Show final projects list
    console.log('\n📋 FINAL PROJECTS LIST:');
    const finalProjects = await client.query(`
      SELECT id, title, document_id, locale, published_at
      FROM projects 
      ORDER BY id;
    `);
    console.table(finalProjects.rows);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

fixDuplicateDocumentIds(); 