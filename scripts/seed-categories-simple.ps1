# Simple Categories Seed Script
Write-Host "`n🚀 Seeding Categories..." -ForegroundColor Cyan

# Database connection
$dbContainer = "DB"
$dbUser = "joy"
$dbName = "give"

# Categories data
$categories = @(
    # Give Categories
    @{name = "Poverty Alleviation"; slug = "poverty-alleviation"; desc = "Help reduce poverty and support underprivileged communities"; type = "give"; icon = "🏠"; color = "#059669"; sort = 2 },
    @{name = "Healthcare"; slug = "healthcare"; desc = "Support medical treatments, health programs, and healthcare access"; type = "give"; icon = "🏥"; color = "#3B82F6"; sort = 3 },
    @{name = "Education"; slug = "education-charity"; desc = "Fund scholarships, schools, and educational programs for those in need"; type = "give"; icon = "📚"; color = "#8B5CF6"; sort = 4 },
    @{name = "Environment"; slug = "environment-conservation"; desc = "Protect the environment and support conservation efforts"; type = "give"; icon = "🌳"; color = "#10B981"; sort = 5 },
    @{name = "Animal Welfare"; slug = "animal-welfare"; desc = "Help animals in need and support animal protection organizations"; type = "give"; icon = "🐾"; color = "#F59E0B"; sort = 6 },
    @{name = "Community Development"; slug = "community-development"; desc = "Support local communities and social development projects"; type = "give"; icon = "🤝"; color = "#6366F1"; sort = 7 },
    @{name = "Humanitarian Aid"; slug = "humanitarian-aid"; desc = "Provide emergency assistance and support human rights initiatives"; type = "give"; icon = "❤️"; color = "#EF4444"; sort = 8 },
    
    # Back Categories
    @{name = "Technology"; slug = "technology"; desc = "Innovative tech products, apps, and software projects"; type = "back"; icon = "💻"; color = "#0EA5E9"; sort = 1 },
    @{name = "Arts"; slug = "arts"; desc = "Visual arts, installations, and creative exhibitions"; type = "back"; icon = "🎨"; color = "#EC4899"; sort = 2 },
    @{name = "Film & Video"; slug = "film-video"; desc = "Movies, documentaries, web series, and video projects"; type = "back"; icon = "🎬"; color = "#F43F5E"; sort = 3 },
    @{name = "Games"; slug = "games"; desc = "Video games, board games, and gaming accessories"; type = "back"; icon = "🎮"; color = "#8B5CF6"; sort = 4 },
    @{name = "Music"; slug = "music"; desc = "Albums, concerts, instruments, and music projects"; type = "back"; icon = "🎵"; color = "#3B82F6"; sort = 5 },
    @{name = "Publishing"; slug = "publishing"; desc = "Books, magazines, comics, and literary projects"; type = "back"; icon = "📖"; color = "#16A34A"; sort = 6 },
    @{name = "Food & Craft"; slug = "food-craft"; desc = "Culinary projects, restaurants, and handmade crafts"; type = "back"; icon = "🍳"; color = "#F97316"; sort = 7 },
    @{name = "Design & Fashion"; slug = "design-fashion"; desc = "Product design, fashion items, and creative accessories"; type = "back"; icon = "👗"; color = "#BE185D"; sort = 8 }
)

# Insert each category
foreach ($cat in $categories) {
    # Check if exists
    $checkQuery = "SELECT COUNT(*) FROM categories WHERE slug = '$($cat.slug)' AND locale = 'en';"
    $exists = docker exec $dbContainer psql -U $dbUser -d $dbName -t -c $checkQuery
    $exists = [int]$exists.Trim()
    
    if ($exists -eq 0) {
        # Generate UUID
        $uuid = [System.Guid]::NewGuid().ToString()
        
        # Insert query
        $insertQuery = @"
INSERT INTO categories (document_id, name, slug, description, type, icon, color, sort_order, is_active, featured, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
VALUES ('$uuid', '$($cat.name)', '$($cat.slug)', '$($cat.desc)', '$($cat.type)', '$($cat.icon)', '$($cat.color)', $($cat.sort), true, false, NOW(), NOW(), NOW(), 1, 1, 'en');
"@
        
        docker exec $dbContainer psql -U $dbUser -d $dbName -c $insertQuery
        Write-Host "✅ Created: $($cat.name) ($($cat.type))" -ForegroundColor Green
    }
    else {
        Write-Host "⏭️ Skipped: $($cat.name) (already exists)" -ForegroundColor Yellow
    }
}

Write-Host "`n📊 Summary:" -ForegroundColor Cyan
$summary = docker exec $dbContainer psql -U $dbUser -d $dbName -c "SELECT type, COUNT(*) as count FROM categories WHERE type IN ('give', 'back') GROUP BY type ORDER BY type;"
Write-Host $summary

Write-Host "`n✅ Categories seeding completed!" -ForegroundColor Green 