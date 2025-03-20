@ECHO OFF
TITLE Fika Headless Launcher
IF NOT EXIST ".\\BepInEx\\plugins\\Fika.Headless.dll" GOTO DLL_NOT_EXIST

:START_HEADLESS
ECHO Starting Headless client... Do not close this window!
EscapeFromTarkov.exe -token=${profileId} -config={'BackendUrl':'${backendUrl}','Version':'live'} -batchmode -nographics --enable-console true && EXIT 0 || EXIT 1
GOTO START_HEADLESS

:DLL_NOT_EXIST
ECHO Could not find 'Fika.Headless.dll'. Please install the Headless plugin before starting the client and make sure the .bat file is in the Headless installation directory where 'EscapeFromTarkov.exe' is.
PAUSE
