$Version = "1.0"
$ProfileId = "${profileId}"
$BackendUrl = "${backendUrl}"
$WaitTime = 2

Write-Host "Fika Headless Watcher v$Version"
Write-Host
Write-Host "Profile Id: $ProfileId"
Write-Host "Backend Url: $BackendUrl"
Write-Host

if (!(Test-Path "$PSScriptRoot\BepInEx\plugins\Fika.Headless.dll")) {
    Write-Host "Could not find 'Fika.Headless.dll'. Please install the Headless plugin before starting the client and make sure the .ps1 file is in the Headless installation directory where 'EscapeFromTarkov.exe' is." -ForegroundColor Red
    Read-Host
    exit
}

$graphicsMode = $false

for ($i = 0; $i -lt $WaitTime; $i++) {
	$countDown = $WaitTime - $i

    Write-Progress -Activity "Starting headless in $countDown... press G to start the headless in graphics mode." -PercentComplete ((100/$WaitTime)*($i+1))
    Start-Sleep -Seconds 1

    if ([Console]::KeyAvailable) {
        $key = [Console]::ReadKey($true).Key

        if ($key -eq "G") {
            $graphicsMode = $true
            break
        }
    }
}

Write-Progress -Activity "Starting headless in..." -Completed

if ($graphicsMode) {
    Write-Host "Starting in graphics mode..."
    Start-Process "$PSScriptRoot\EscapeFromTarkov.exe" -WorkingDirectory $PSScriptRoot -ArgumentList "-token=$ProfileId", "-config={'BackendUrl':'$BackendUrl','Version':'live'}", "--enable-console true" -Wait
    exit
}

while ($true) {
    Start-Process "$PSScriptRoot\EscapeFromTarkov.exe" -WorkingDirectory $PSScriptRoot -ArgumentList "-token=$ProfileId", "-config={'BackendUrl':'$BackendUrl','Version':'live'}", "-batchmode", "-nographics", "--enable-console true" -Wait
}