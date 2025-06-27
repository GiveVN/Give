# Seed Categories Script for Give Platform
# This script creates categories for both Give (charitable) and Back (creative) project types

$strapiUrl = "http://localhost:1338"
$apiToken = $env:STRAPI_API_TOKEN

if (-not $apiToken) {
    Write-Host "Please set STRAPI_API_TOKEN environment variable" -ForegroundColor Red
    Write-Host "You can create an API token in Strapi Admin > Settings > API Tokens" -ForegroundColor Yellow
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $apiToken"
    "Content-Type"  = "application/json"
}

# Give Categories (Charitable/Donation projects)
$giveCategories = @(
    @{
        Name        = "Disaster Relief"
        Slug        = "disaster-relief"
        Description = "Support communities affected by natural disasters and emergencies"
        Type        = "give"
        Icon        = "🆘"
        Color       = "#DC2626"
        SortOrder   = 1
    },
    @{
        Name        = "Poverty Alleviation"
        Slug        = "poverty-alleviation"
        Description = "Help reduce poverty and support underprivileged communities"
        Type        = "give"
        Icon        = "🏠"
        Color       = "#059669"
        SortOrder   = 2
    },
    @{
        Name        = "Healthcare"
        Slug        = "healthcare"
        Description = "Support medical treatments, health programs, and healthcare access"
        Type        = "give"
        Icon        = "🏥"
        Color       = "#3B82F6"
        SortOrder   = 3
    },
    @{
        Name        = "Education"
        Slug        = "education-charity"
        Description = "Fund scholarships, schools, and educational programs for those in need"
        Type        = "give"
        Icon        = "📚"
        Color       = "#8B5CF6"
        SortOrder   = 4
    },
    @{
        Name        = "Environment"
        Slug        = "environment-conservation"
        Description = "Protect the environment and support conservation efforts"
        Type        = "give"
        Icon        = "🌳"
        Color       = "#10B981"
        SortOrder   = 5
    },
    @{
        Name        = "Animal Welfare"
        Slug        = "animal-welfare"
        Description = "Help animals in need and support animal protection organizations"
        Type        = "give"
        Icon        = "🐾"
        Color       = "#F59E0B"
        SortOrder   = 6
    },
    @{
        Name        = "Community Development"
        Slug        = "community-development"
        Description = "Support local communities and social development projects"
        Type        = "give"
        Icon        = "🤝"
        Color       = "#6366F1"
        SortOrder   = 7
    },
    @{
        Name        = "Humanitarian Aid"
        Slug        = "humanitarian-aid"
        Description = "Provide emergency assistance and support human rights initiatives"
        Type        = "give"
        Icon        = "❤️"
        Color       = "#EF4444"
        SortOrder   = 8
    }
)

# Back Categories (Creative/Reward-based projects)
$backCategories = @(
    @{
        Name        = "Technology"
        Slug        = "technology"
        Description = "Innovative tech products, apps, and software projects"
        Type        = "back"
        Icon        = "💻"
        Color       = "#0EA5E9"
        SortOrder   = 1
    },
    @{
        Name        = "Arts"
        Slug        = "arts"
        Description = "Visual arts, installations, and creative exhibitions"
        Type        = "back"
        Icon        = "🎨"
        Color       = "#EC4899"
        SortOrder   = 2
    },
    @{
        Name        = "Film & Video"
        Slug        = "film-video"
        Description = "Movies, documentaries, web series, and video projects"
        Type        = "back"
        Icon        = "🎬"
        Color       = "#F43F5E"
        SortOrder   = 3
    },
    @{
        Name        = "Games"
        Slug        = "games"
        Description = "Video games, board games, and gaming accessories"
        Type        = "back"
        Icon        = "🎮"
        Color       = "#8B5CF6"
        SortOrder   = 4
    },
    @{
        Name        = "Music"
        Slug        = "music"
        Description = "Albums, concerts, instruments, and music projects"
        Type        = "back"
        Icon        = "🎵"
        Color       = "#3B82F6"
        SortOrder   = 5
    },
    @{
        Name        = "Publishing"
        Slug        = "publishing"
        Description = "Books, magazines, comics, and literary projects"
        Type        = "back"
        Icon        = "📖"
        Color       = "#16A34A"
        SortOrder   = 6
    },
    @{
        Name        = "Food & Craft"
        Slug        = "food-craft"
        Description = "Culinary projects, restaurants, and handmade crafts"
        Type        = "back"
        Icon        = "🍳"
        Color       = "#F97316"
        SortOrder   = 7
    },
    @{
        Name        = "Design & Fashion"
        Slug        = "design-fashion"
        Description = "Product design, fashion items, and creative accessories"
        Type        = "back"
        Icon        = "👗"
        Color       = "#BE185D"
        SortOrder   = 8
    }
)

function Create-Category($category) {
    $body = @{
        data = @{
            Name        = $category.Name
            Slug        = $category.Slug
            Description = $category.Description
            Type        = $category.Type
            Icon        = $category.Icon
            Color       = $category.Color
            SortOrder   = $category.SortOrder
            IsActive    = $true
            Featured    = $false
        }
    } | ConvertTo-Json -Depth 10

    try {
        $response = Invoke-RestMethod -Uri "$strapiUrl/api/categories" -Method Post -Headers $headers -Body $body
        Write-Host "✅ Created category: $($category.Name) ($($category.Type))" -ForegroundColor Green
    }
    catch {
        if ($_.Exception.Response.StatusCode -eq 400) {
            Write-Host "⚠️  Category already exists: $($category.Name)" -ForegroundColor Yellow
        }
        else {
            Write-Host "❌ Failed to create category: $($category.Name)" -ForegroundColor Red
            Write-Host $_.Exception.Message -ForegroundColor Red
        }
    }
}

Write-Host "`n🎯 Creating Give Categories (Charitable)..." -ForegroundColor Cyan
foreach ($category in $giveCategories) {
    Create-Category $category
}

Write-Host "`n🚀 Creating Back Categories (Creative)..." -ForegroundColor Cyan
foreach ($category in $backCategories) {
    Create-Category $category
}

Write-Host "`n✨ Category seeding completed!" -ForegroundColor Green
Write-Host "Total categories: $($giveCategories.Count + $backCategories.Count)" -ForegroundColor Cyan 