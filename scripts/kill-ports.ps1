# Kill processes on specific ports for Give project
Write-Host "Checking ports for Give project..." -ForegroundColor Cyan

$ports = @(1338, 3003)
$killed = $false

foreach ($port in $ports) {
    $connection = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if ($connection) {
        $processId = $connection.OwningProcess
        $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
        if ($process) {
            Write-Host "Port $port is used by $($process.ProcessName) (PID: $processId)" -ForegroundColor Yellow
            Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
            Write-Host "✓ Port $port cleared" -ForegroundColor Green
            $killed = $true
        }
    }
}

if ($killed) {
    # Wait for ports to be freed
    Write-Host "Waiting for ports to be freed..." -ForegroundColor Yellow
    Start-Sleep -Seconds 1
}
else {
    Write-Host "All ports are already free!" -ForegroundColor Green
}

Write-Host "" 