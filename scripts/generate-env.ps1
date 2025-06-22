# Requires: 1Password CLI v2 installed and signed in (op signin)

param(
    [string]$TplFile = "",
    [string]$OutFile = ""
)

if (-not $TplFile -or -not $OutFile) {
    Write-Error "Usage: generate-env.ps1 -TplFile <template> -OutFile <output>"
    exit 1
}

if (Test-Path $OutFile) {
    Write-Host "$OutFile đã tồn tại – bỏ qua."
    exit 0
}

if (-not (Test-Path $TplFile)) {
    Write-Error "Không tìm thấy template $TplFile"
    exit 1
}

try {
    Write-Host "🔑 Inject secrets từ 1Password vào $OutFile ..."
    op inject --input-file $TplFile --output-file $OutFile
    Write-Host "✅ Tạo $OutFile thành công."
}
catch {
    Write-Warning "⚠️  op inject thất bại. Hãy chắc chắn đã 'op signin' và template đúng."
    exit 1
} 