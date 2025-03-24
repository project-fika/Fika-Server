$Version = "1.1"
$ProfileId = "${profileId}"
$BackendUrl = "${backendUrl}"
$WaitTime = 2

$Host.UI.RawUI.WindowTitle = "Fika Headless Watcher v$Version"

Write-Host "Fika Headless Watcher v$Version"
Write-Host
Write-Host "Profile Id: $ProfileId"
Write-Host "Backend Url: $BackendUrl"
Write-Host

if (!(Test-Path "$PSScriptRoot\EscapeFromTarkov.exe")) {
    Write-Host "Could not find 'EscapeFromTarkov.exe'. Please move this launch script into the root directory of your headless client SPT install." -ForegroundColor Red
    Write-Host "Press [ENTER] or close this window to exit..."
    Read-Host
    exit
}

if (!(Test-Path "$PSScriptRoot\BepInEx\plugins\Fika.Headless.dll")) {
    Write-Host "Could not find 'Fika.Headless.dll'. Please install the Headless plugin before launching this script." -ForegroundColor Red
    Write-Host "Press [ENTER] or close this window to exit..."
    Read-Host
    exit
}

if (!(Test-Path "$PSScriptRoot\BepInEx\plugins\Fika.Core.dll")) {
    Write-Host "Could not find 'Fika.Core.dll'. If you have not made a copy of a working SPT+Fika install, please start over from the first step of the instructions on the wiki. If you have mistakenly deleted Fika.Core.dll, please reinstall it." -ForegroundColor Red
    Write-Host "Press [ENTER] or close this window to exit..."
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

Write-Host "[INFO]" -ForegroundColor Blue
Write-Host " - This script will restart the headless client console if it crashes or closes"
Write-Host " - To force the headless client to restart after X number of raids, change 'restartAfterAmountOfRaids' in the server mod configuration"
Write-Host
Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Starting headless client"

while ($true) {
    Start-Process "$PSScriptRoot\EscapeFromTarkov.exe" -WorkingDirectory $PSScriptRoot -ArgumentList "-token=$ProfileId", "-config={'BackendUrl':'$BackendUrl','Version':'live'}", "-batchmode", "-nographics", "--enable-console true" -Wait
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Headless client closed, restarting"
}
