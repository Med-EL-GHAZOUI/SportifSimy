$connections = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
$processIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique | Where-Object { $_ -gt 0 }

if (-not $processIds) {
  Write-Host "Aucun serveur sur le port 3000."
  exit 0
}

foreach ($processId in $processIds) {
  try {
    $process = Get-Process -Id $processId -ErrorAction Stop
    Write-Host "Arrêt du processus $($process.ProcessName) ($processId) sur le port 3000..."
    Stop-Process -Id $processId -Force
  } catch {
    Write-Host "Impossible d'arrêter le processus $processId : $($_.Exception.Message)"
  }
}

Write-Host "Port 3000 libéré."
