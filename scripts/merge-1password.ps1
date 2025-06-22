param(
    [Parameter(Mandatory = $true)][string]$Vault,
    [Parameter(Mandatory = $true)][string]$Source,
    [Parameter(Mandatory = $true)][string]$Target
)

Write-Host "🔄 Merging 1Password item $Source -> $Target in vault $Vault ..."

try {
    $json = op item get $Source --vault $Vault --format json --reveal | ConvertFrom-Json
    $fields = $json.fields | Where-Object { $_.label -and $_.value }
    foreach ($f in $fields) {
        Write-Host "  •" $f.label
        op item edit $Target --vault $Vault "$($f.label)=$($f.value)" | Out-Null
    }
    Write-Host "✅ Merge completed!"
}
catch {
    Write-Error "Merge error: $_"
    exit 1
} 