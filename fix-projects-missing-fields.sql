-- Fix Projects Missing Required Fields
-- This script adds missing required fields to projects that cannot be published

-- First, let's see current status
SELECT 
  id,
  document_id,
  title,
  CASE WHEN description IS NULL OR description = '' THEN 'Missing' ELSE 'OK' END as description_status,
  CASE WHEN category IS NULL THEN 'Missing' ELSE category END as category_status,
  CASE WHEN "projectStatus" IS NULL THEN 'Missing' ELSE "projectStatus" END as status,
  CASE WHEN "fundingGoal" IS NULL OR "fundingGoal" <= 0 THEN 'Missing/Invalid' ELSE "fundingGoal"::text END as funding_goal,
  CASE WHEN currency IS NULL THEN 'Missing' ELSE currency END as currency_status,
  CASE WHEN "startDate" IS NULL THEN 'Missing' ELSE 'OK' END as start_date_status,
  CASE WHEN "endDate" IS NULL THEN 'Missing' ELSE 'OK' END as end_date_status,
  locale,
  published_at
FROM projects 
ORDER BY created_at DESC;

-- Update projects with missing description
UPDATE projects 
SET description = CONCAT('Mô tả chi tiết cho dự án "', COALESCE(title, 'Untitled'), '". Đây là một dự án crowdfunding nhằm gây quỹ cho mục đích tốt đẹp, mang lại giá trị tích cực cho cộng đồng và xã hội.'),
    updated_at = NOW()
WHERE description IS NULL OR description = '';

-- Update projects with missing category
UPDATE projects 
SET category = 'community',
    updated_at = NOW()
WHERE category IS NULL;

-- Update projects with missing projectStatus
UPDATE projects 
SET "projectStatus" = 'active',
    updated_at = NOW()
WHERE "projectStatus" IS NULL;

-- Update projects with missing or invalid fundingGoal
UPDATE projects 
SET "fundingGoal" = 50000000, -- 50 million VND
    updated_at = NOW()
WHERE "fundingGoal" IS NULL OR "fundingGoal" <= 0;

-- Update projects with missing currency
UPDATE projects 
SET currency = 'VND',
    updated_at = NOW()
WHERE currency IS NULL;

-- Update projects with missing startDate
UPDATE projects 
SET "startDate" = '2025-01-01 00:00:00',
    updated_at = NOW()
WHERE "startDate" IS NULL;

-- Update projects with missing endDate
UPDATE projects 
SET "endDate" = '2025-12-31 23:59:59',
    updated_at = NOW()
WHERE "endDate" IS NULL;

-- Update projects with missing document_id
UPDATE projects 
SET document_id = CONCAT('proj_', EXTRACT(EPOCH FROM NOW())::bigint, '_', substr(md5(random()::text), 1, 9)),
    updated_at = NOW()
WHERE document_id IS NULL;

-- Update projects with missing locale
UPDATE projects 
SET locale = 'en',
    updated_at = NOW()
WHERE locale IS NULL;

-- Add some additional helpful fields
UPDATE projects 
SET 
  "currentFunding" = COALESCE("currentFunding", 0),
  "backersCount" = COALESCE("backersCount", 0),
  featured = COALESCE(featured, false),
  updated_at = NOW()
WHERE "currentFunding" IS NULL OR "backersCount" IS NULL OR featured IS NULL;

-- Verify results
SELECT 
  id,
  document_id,
  title,
  CASE WHEN description IS NULL OR description = '' THEN '❌ Missing' ELSE '✅ OK' END as description_status,
  CASE WHEN category IS NULL THEN '❌ Missing' ELSE category END as category_status,
  CASE WHEN "projectStatus" IS NULL THEN '❌ Missing' ELSE "projectStatus" END as status,
  CASE WHEN "fundingGoal" IS NULL OR "fundingGoal" <= 0 THEN '❌ Missing/Invalid' ELSE CONCAT('✅ ', "fundingGoal"::text) END as funding_goal,
  CASE WHEN currency IS NULL THEN '❌ Missing' ELSE currency END as currency_status,
  CASE WHEN "startDate" IS NULL THEN '❌ Missing' ELSE '✅ OK' END as start_date_status,
  CASE WHEN "endDate" IS NULL THEN '❌ Missing' ELSE '✅ OK' END as end_date_status,
  locale,
  published_at
FROM projects 
ORDER BY created_at DESC;

-- Count projects by status
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

-- Show projects ready for publishing
SELECT 
  id,
  document_id,
  title,
  category,
  "projectStatus",
  "fundingGoal",
  currency,
  CASE WHEN published_at IS NULL THEN '📝 Draft - Ready to Publish' ELSE '✅ Published' END as publish_status
FROM projects 
ORDER BY created_at DESC; 