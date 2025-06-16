import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:password@localhost:5432/give'
    }
  }
});

async function fixProjectsMissingFields() {
  try {
    console.log('🔍 Checking projects with missing required fields...');
    
    // Get all projects
    const projects = await prisma.$queryRaw`
      SELECT 
        id, 
        document_id, 
        title, 
        description, 
        category, 
        "projectStatus",
        "fundingGoal",
        currency,
        "startDate",
        "endDate",
        locale,
        published_at
      FROM projects 
      ORDER BY created_at DESC
    `;
    
    console.log(`📊 Found ${(projects as any[]).length} projects`);
    
    for (const project of projects as any[]) {
      const updates: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;
      
      // Check and fix missing required fields
      if (!project.description || project.description.trim() === '') {
        updates.push(`description = $${paramIndex++}`);
        values.push(`Mô tả chi tiết cho dự án "${project.title || 'Untitled'}". Đây là một dự án crowdfunding nhằm gây quỹ cho mục đích tốt đẹp, mang lại giá trị tích cực cho cộng đồng.`);
      }
      
      if (!project.category) {
        updates.push(`category = $${paramIndex++}`);
        values.push('community'); // Default category
      }
      
      if (!project.projectStatus) {
        updates.push(`"projectStatus" = $${paramIndex++}`);
        values.push('active'); // Default status
      }
      
      if (!project.fundingGoal || project.fundingGoal <= 0) {
        updates.push(`"fundingGoal" = $${paramIndex++}`);
        values.push(50000000); // 50 million VND default
      }
      
      if (!project.currency) {
        updates.push(`currency = $${paramIndex++}`);
        values.push('VND'); // Default currency
      }
      
      if (!project.startDate) {
        updates.push(`"startDate" = $${paramIndex++}`);
        values.push(new Date('2025-01-01')); // Default start date
      }
      
      if (!project.endDate) {
        updates.push(`"endDate" = $${paramIndex++}`);
        values.push(new Date('2025-12-31')); // Default end date
      }
      
      // Add document_id where missing
      if (!project.document_id) {
        updates.push(`document_id = $${paramIndex++}`);
        values.push(`proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
      }
      
      // Add locale where missing
      if (!project.locale) {
        updates.push(`locale = $${paramIndex++}`);
        values.push('en');
      }
      
      if (updates.length > 0) {
        values.push(project.id);
        const query = `
          UPDATE projects 
          SET ${updates.join(', ')}, updated_at = NOW()
          WHERE id = $${paramIndex}
        `;
        
        console.log(`🔧 Updating project ID ${project.id}: ${project.title}`);
        console.log(`   Fields updated: ${updates.join(', ')}`);
        
        await prisma.$executeRawUnsafe(query, ...values);
      } else {
        console.log(`✅ Project ID ${project.id} already has all required fields`);
      }
    }
    
    // Verify results
    console.log('\n📋 Verification - Projects after update:');
    const updatedProjects = await prisma.$queryRaw`
      SELECT 
        id,
        document_id,
        title,
        CASE WHEN description IS NULL OR description = '' THEN '❌ Missing' ELSE '✅ OK' END as description_status,
        CASE WHEN category IS NULL THEN '❌ Missing' ELSE category END as category_status,
        CASE WHEN "projectStatus" IS NULL THEN '❌ Missing' ELSE "projectStatus" END as status,
        CASE WHEN "fundingGoal" IS NULL OR "fundingGoal" <= 0 THEN '❌ Missing/Invalid' ELSE "fundingGoal" END as funding_goal,
        CASE WHEN currency IS NULL THEN '❌ Missing' ELSE currency END as currency_status,
        CASE WHEN "startDate" IS NULL THEN '❌ Missing' ELSE '✅ OK' END as start_date_status,
        CASE WHEN "endDate" IS NULL THEN '❌ Missing' ELSE '✅ OK' END as end_date_status,
        locale,
        published_at
      FROM projects 
      ORDER BY created_at DESC
    `;
    
    console.table(updatedProjects);
    
    console.log('\n🎉 All projects now have required fields and should be publishable!');
    
  } catch (error) {
    console.error('❌ Error fixing projects:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixProjectsMissingFields(); 