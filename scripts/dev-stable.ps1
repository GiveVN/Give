Write-Host "Starting Give Development Environment (Stable Mode)..." -ForegroundColor Cyan

# Kill existing processes
Write-Host "`nCleaning up ports..." -ForegroundColor Yellow
& "$PSScriptRoot\kill-ports.ps1"

Write-Host "`nStarting services..." -ForegroundColor Green

# Start Strapi in background job
$strapiJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    cd apps/strapi
    yarn develop
}

# Give Strapi time to start
Write-Host "Waiting for Strapi to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# Check if Strapi is running
$strapiRunning = Test-NetConnection -ComputerName localhost -Port 1338 -InformationLevel Quiet
if ($strapiRunning) {
    Write-Host "✓ Strapi started on port 1338" -ForegroundColor Green
} else {
    Write-Host "✗ Strapi failed to start" -ForegroundColor Red
    Stop-Job $strapiJob
    Remove-Job $strapiJob
    exit 1
}

# Start UI in foreground
Write-Host "`nStarting UI..." -ForegroundColor Green
cd apps/ui
yarn dev

# When UI exits, stop Strapi job
Stop-Job $strapiJob -ErrorAction SilentlyContinue
Remove-Job $strapiJob -ErrorAction SilentlyContinue 