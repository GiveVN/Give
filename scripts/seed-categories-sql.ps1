# Seed Categories via SQL for Give Platform
# This script inserts categories directly into PostgreSQL database

Write-Host "`n🚀 Seeding Categories via SQL..." -ForegroundColor Cyan

# Database connection info
$dbContainer = "DB"
$dbUser = "joy"
$dbName = "give"

# SQL script to insert categories
$sqlScript = @"
-- Check and insert Give Categories only if not exists
DO $$
BEGIN
    -- Poverty Alleviation
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'poverty-alleviation' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Poverty Alleviation', 'poverty-alleviation', 'Help reduce poverty and support underprivileged communities', 'give', '🏠', '#059669', 2, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Healthcare
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'healthcare' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Healthcare', 'healthcare', 'Support medical treatments, health programs, and healthcare access', 'give', '🏥', '#3B82F6', 3, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Education
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'education-charity' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Education', 'education-charity', 'Fund scholarships, schools, and educational programs for those in need', 'give', '📚', '#8B5CF6', 4, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Environment
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'environment-conservation' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Environment', 'environment-conservation', 'Protect the environment and support conservation efforts', 'give', '🌳', '#10B981', 5, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Animal Welfare
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'animal-welfare' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Animal Welfare', 'animal-welfare', 'Help animals in need and support animal protection organizations', 'give', '🐾', '#F59E0B', 6, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Community Development
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'community-development' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Community Development', 'community-development', 'Support local communities and social development projects', 'give', '🤝', '#6366F1', 7, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Humanitarian Aid
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'humanitarian-aid' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Humanitarian Aid', 'humanitarian-aid', 'Provide emergency assistance and support human rights initiatives', 'give', '❤️', '#EF4444', 8, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Back Categories
    -- Technology
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'technology' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Technology', 'technology', 'Innovative tech products, apps, and software projects', 'back', '💻', '#0EA5E9', 1, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Arts
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'arts' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Arts', 'arts', 'Visual arts, installations, and creative exhibitions', 'back', '🎨', '#EC4899', 2, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Film & Video
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'film-video' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Film & Video', 'film-video', 'Movies, documentaries, web series, and video projects', 'back', '🎬', '#F43F5E', 3, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Games
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'games' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Games', 'games', 'Video games, board games, and gaming accessories', 'back', '🎮', '#8B5CF6', 4, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Music
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'music' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Music', 'music', 'Albums, concerts, instruments, and music projects', 'back', '🎵', '#3B82F6', 5, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Publishing
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'publishing' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Publishing', 'publishing', 'Books, magazines, comics, and literary projects', 'back', '📖', '#16A34A', 6, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Food & Craft
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'food-craft' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Food & Craft', 'food-craft', 'Culinary projects, restaurants, and handmade crafts', 'back', '🍳', '#F97316', 7, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
    
    -- Design & Fashion
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'design-fashion' AND locale = 'en') THEN
        INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES (gen_random_uuid()::text, 'Design & Fashion', 'design-fashion', 'Product design, fashion items, and creative accessories', 'back', '👗', '#BE185D', 8, true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
    END IF;
END $$;
"@

# Execute SQL
try {
    # Save SQL to temp file
    $tempFile = [System.IO.Path]::GetTempFileName()
    $tempFile = [System.IO.Path]::ChangeExtension($tempFile, ".sql")
    $sqlScript | Out-File -FilePath $tempFile -Encoding UTF8

    # Execute SQL via docker
    Get-Content $tempFile | docker exec -i $dbContainer psql -U $dbUser -d $dbName

    Write-Host "`n✅ Categories seeded successfully!" -ForegroundColor Green

    # Show results
    Write-Host "`n📊 Checking inserted categories..." -ForegroundColor Cyan
    $checkQuery = "SELECT type, COUNT(*) as count FROM categories WHERE type IN ('give', 'back') GROUP BY type ORDER BY type;"
    docker exec $dbContainer psql -U $dbUser -d $dbName -c $checkQuery

    Write-Host "`n📋 All categories:" -ForegroundColor Cyan
    $listQuery = "SELECT name, slug, type, is_active FROM categories WHERE type IN ('give', 'back') ORDER BY type, sort_order;"
    docker exec $dbContainer psql -U $dbUser -d $dbName -c $listQuery

    # Clean up temp file
    Remove-Item $tempFile -Force
}
catch {
    Write-Host "❌ Error seeding categories:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
} 