Write-Host "=== Downgrading React to version 18 ===" -ForegroundColor Cyan

# Update Strapi package.json
Write-Host "`nUpdating apps/strapi/package.json..." -ForegroundColor Yellow
$strapiPackage = Get-Content "apps/strapi/package.json" -Raw | ConvertFrom-Json
$strapiPackage.dependencies."react" = "^18.3.1"
$strapiPackage.dependencies."react-dom" = "^18.3.1"
$strapiPackage | ConvertTo-Json -Depth 10 | Set-Content "apps/strapi/package.json"

# Update UI package.json
Write-Host "Updating apps/ui/package.json..." -ForegroundColor Yellow
$uiPackage = Get-Content "apps/ui/package.json" -Raw | ConvertFrom-Json
$uiPackage.dependencies."react" = "^18.3.1"
$uiPackage.dependencies."react-dom" = "^18.3.1"
$uiPackage.devDependencies."@types/react" = "^18.3.14"
$uiPackage.devDependencies."@types/react-dom" = "^18.3.5"
$uiPackage | ConvertTo-Json -Depth 10 | Set-Content "apps/ui/package.json"

Write-Host "`n✅ Package.json files updated!" -ForegroundColor Green

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Stop all running services (Ctrl+C in terminal)" -ForegroundColor White
Write-Host "2. Delete node_modules folders:" -ForegroundColor White
Write-Host "   - rm -rf node_modules" -ForegroundColor Gray
Write-Host "   - rm -rf apps/strapi/node_modules" -ForegroundColor Gray
Write-Host "   - rm -rf apps/ui/node_modules" -ForegroundColor Gray
Write-Host "3. Delete yarn.lock file:" -ForegroundColor White
Write-Host "   - rm yarn.lock" -ForegroundColor Gray
Write-Host "4. Reinstall dependencies:" -ForegroundColor White
Write-Host "   - yarn install" -ForegroundColor Gray
Write-Host "5. Start services again:" -ForegroundColor White
Write-Host "   - yarn dev" -ForegroundColor Gray 