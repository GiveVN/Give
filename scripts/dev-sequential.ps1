Write-Host "Starting Give Development Environment..." -ForegroundColor Cyan

# Clean up ports first
Write-Host "`nCleaning up ports..." -ForegroundColor Yellow
$ports = @(1338, 3003)
foreach ($port in $ports) {
    $connection = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if ($connection) {
        $processId = $connection.OwningProcess
        Write-Host "Killing process on port $port (PID: $processId)" -ForegroundColor Red
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
    }
}

# Wait for ports to be freed
Start-Sleep -Seconds 2

# Start Strapi first
Write-Host "`nStarting Strapi on port 1338..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/strapi; yarn develop" -WindowStyle Normal

# Wait for Strapi to start
Write-Host "Waiting for Strapi to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check if Strapi started successfully
$strapiRunning = Test-NetConnection -ComputerName localhost -Port 1338 -InformationLevel Quiet
if ($strapiRunning) {
    Write-Host "✓ Strapi started successfully!" -ForegroundColor Green
}
else {
    Write-Host "✗ Strapi failed to start. Check the Strapi window for errors." -ForegroundColor Red
    exit 1
}

# Start Web
Write-Host "`nStarting Web on port 3003..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/web; yarn dev" -WindowStyle Normal

# Wait for Web to start
Write-Host "Waiting for Web to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check if Web started successfully
$webRunning = Test-NetConnection -ComputerName localhost -Port 3003 -InformationLevel Quiet
if ($webRunning) {
    Write-Host "✓ Web started successfully!" -ForegroundColor Green
}
else {
    Write-Host "✗ Web failed to start. Check the Web window for errors." -ForegroundColor Red
}

Write-Host "`n✅ Development environment started!" -ForegroundColor Green
Write-Host "Strapi: http://localhost:1338" -ForegroundColor Cyan
Write-Host "Web: http://localhost:3003" -ForegroundColor Cyan 