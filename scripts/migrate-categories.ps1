Write-Host "Category Migration Script" -ForegroundColor Cyan
Write-Host "This script will help migrate category data from enum to relation" -ForegroundColor Yellow

# Category mapping từ enum value sang tên category
$categoryMapping = @{
    "technology"  = "Technology"
    "health"      = "Health & Medical"
    "education"   = "Education"
    "environment" = "Environment"
    "arts"        = "Arts & Culture"
    "community"   = "Community"
    "business"    = "Business"
    "sports"      = "Sports"
    "travel"      = "Travel"
    "food"        = "Food & Beverage"
    "fashion"     = "Fashion"
    "games"       = "Games"
    "film"        = "Film & Video"
    "music"       = "Music"
    "publishing"  = "Publishing"
}

Write-Host "`nCategory Mapping:" -ForegroundColor Green
$categoryMapping.GetEnumerator() | ForEach-Object {
    Write-Host "$($_.Key) -> $($_.Value)"
}

Write-Host "`nSQL Commands to run after creating categories in Strapi admin:" -ForegroundColor Cyan
Write-Host "1. First, create all categories in Strapi admin panel" -ForegroundColor Yellow
Write-Host "2. Then run these SQL commands to get category IDs:" -ForegroundColor Yellow
Write-Host ""

# SQL to get category IDs
Write-Host "-- Get category IDs:" -ForegroundColor Gray
Write-Host "SELECT id, name, slug FROM categories ORDER BY name;" -ForegroundColor White
Write-Host ""

Write-Host "3. Update projects with category relations:" -ForegroundColor Yellow
Write-Host ""

# SQL template for updating projects
Write-Host "-- Example update commands (replace category_id with actual IDs):" -ForegroundColor Gray
foreach ($enum in $categoryMapping.Keys) {
    Write-Host "UPDATE projects SET category_id = [category_id] WHERE category = '$enum';" -ForegroundColor White
}

Write-Host "`n4. After migration, the category column can be dropped:" -ForegroundColor Yellow
Write-Host "ALTER TABLE projects DROP COLUMN category;" -ForegroundColor White

Write-Host "`nDone! Follow the steps above to complete migration." -ForegroundColor Green

# PowerShell script to migrate Type field from charity to give/back
# Run this after updating the schema

Write-Host "Starting Type migration from charity to give/back..." -ForegroundColor Green

# Database connection parameters
$dbHost = "localhost"
$dbPort = "5442"
$dbName = "give"
$dbUser = "postgres"
$dbPassword = "givethio"

# SQL to migrate Type values
$sql = @"
-- Update Type from 'charity' to 'give'
UPDATE projects
SET type = 'give'
WHERE type = 'charity' OR type IS NULL;

-- Show migration results
SELECT 
    type,
    COUNT(*) as count,
    STRING_AGG(title, ', ' ORDER BY title) as projects
FROM projects
GROUP BY type;
"@

try {
    # Execute the migration via Docker
    Write-Host "Connecting to database via Docker..." -ForegroundColor Yellow
    
    # Use docker exec to run the SQL
    $result = docker exec -i DB psql -U postgres -d give -c "$sql" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Migration completed successfully!" -ForegroundColor Green
        Write-Host "Results:" -ForegroundColor Cyan
        Write-Host $result
    }
    else {
        Write-Host "Migration failed!" -ForegroundColor Red
        Write-Host $result
    }
}
catch {
    Write-Host "Error during migration: $_" -ForegroundColor Red
}

Write-Host "`nMigration script completed." -ForegroundColor Green
Write-Host "Note: Restart Strapi for changes to take effect." -ForegroundColor Yellow 