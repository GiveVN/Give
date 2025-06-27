# Kill processes on specific ports before starting dev
Write-Host "Cleaning up ports 1338 and 3003..." -ForegroundColor Yellow

# Kill processes on port 1338 (Strapi)
$port1338 = Get-NetTCPConnection -LocalPort 1338 -State Listen -ErrorAction SilentlyContinue
if ($port1338) {
    $processId = $port1338.OwningProcess
    Write-Host "Killing process on port 1338 (PID: $processId)" -ForegroundColor Red
    Stop-Process -Id $processId -Force
}
else {
    Write-Host "Port 1338 is already free" -ForegroundColor Green
}

# Kill processes on port 3003 (UI)
$port3003 = Get-NetTCPConnection -LocalPort 3003 -State Listen -ErrorAction SilentlyContinue
if ($port3003) {
    $processId = $port3003.OwningProcess
    Write-Host "Killing process on port 3003 (PID: $processId)" -ForegroundColor Red
    Stop-Process -Id $processId -Force
}
else {
    Write-Host "Port 3003 is already free" -ForegroundColor Green
}

# Small delay to ensure ports are freed
Start-Sleep -Seconds 1

Write-Host "Ports cleaned up! Starting dev environment..." -ForegroundColor Green

# Start dev environment với turbo
turbo dev 