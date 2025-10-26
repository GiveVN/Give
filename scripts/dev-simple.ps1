Write-Host "Simple Dev Script - Run each service separately" -ForegroundColor Cyan
Write-Host "This script will guide you to run services manually" -ForegroundColor Yellow
Write-Host ""

Write-Host "Step 1: Open a new terminal and run:" -ForegroundColor Green
Write-Host "  cd apps/strapi" -ForegroundColor White
Write-Host "  yarn develop" -ForegroundColor White
Write-Host ""

Write-Host "Step 2: Open another terminal and run:" -ForegroundColor Green
Write-Host "  cd apps/web" -ForegroundColor White
Write-Host "  yarn dev" -ForegroundColor White
Write-Host ""

Write-Host "Optional - Design System (if needed):" -ForegroundColor Gray
Write-Host "  cd packages/design-system" -ForegroundColor White
Write-Host "  yarn dev" -ForegroundColor White
Write-Host ""

Write-Host "Services will be available at:" -ForegroundColor Cyan
Write-Host "  Strapi: http://localhost:1338" -ForegroundColor White
Write-Host "  Web: http://localhost:3003" -ForegroundColor White 