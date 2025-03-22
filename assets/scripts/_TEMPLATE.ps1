$profileId = "${profileId}"
$backendUrl = "${backendUrl}"
$graphicsMode = $False
$version = "1.0"

Write-Host "Fika Headless Watcher v$version"
Write-Host "Profile Id: $profileId"
Write-Host "Backend Url: $backendUrl"
Write-Host

if (!(Test-Path "$PSScriptRoot\BepInEx\plugins\Fika.Headless.dll")) {
    Write-Host "Could not find 'Fika.Headless.dll'. Please install the Headless plugin before starting the client and make sure the .bat file is in the Headless installation directory where 'EscapeFromTarkov.exe' is."
    Read-Host
    Exit
}

for ($i = 0; $i -lt 3; $i++) {
    if ([Console]::KeyAvailable) {
        $key = [Console]::ReadKey($true).Key

	if ($key -in 'G') {
            $graphicsMode = $true
            break
        }
    }

    $countDown = 3 - $i

    Write-Progress -Activity "Starting headless in $countDown... press G to start the headless in graphics mode." -PercentComplete ((100/3)*($i+1))
    Start-Sleep -Seconds 1
}

Write-Progress -Activity "Complete" -Completed

if ($graphicsMode) {
    Write-Host "Starting in graphics mode..."
    Start-Process "$PSScriptRoot\EscapeFromTarkov.exe" -WorkingDirectory "$PSScriptRoot" -ArgumentList "-token=$profileId", "-config={'BackendUrl':'$backendUrl','Version':'live'}", "--enable-console true" -Wait
    exit
}

while ($true) {
    Start-Process "$PSScriptRoot\EscapeFromTarkov.exe" -WorkingDirectory "$PSScriptRoot" -ArgumentList "-token=$profileId", "-config={'BackendUrl':'$backendUrl','Version':'live'}", "-batchmode", "-nographics", "--enable-console true" -Wait
}
