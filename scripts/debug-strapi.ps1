Write-Host "Starting Strapi with debug logging..." -ForegroundColor Cyan

# Set environment variables
$env:NODE_OPTIONS = "--max-old-space-size=4096"
$env:DEBUG = "*"
$env:NODE_ENV = "development"

# Change to Strapi directory
Set-Location -Path "apps/strapi"

Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host "Node version: $(node --version)" -ForegroundColor Yellow
Write-Host "Yarn version: $(yarn --version)" -ForegroundColor Yellow

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    yarn install
}

Write-Host "`nStarting Strapi..." -ForegroundColor Green

# Run Strapi
yarn develop 