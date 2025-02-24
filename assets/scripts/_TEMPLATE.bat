@ECHO OFF
IF NOT EXIST ".\\BepInEx\\plugins\\Fika.Headless.dll" GOTO DLL_NOT_EXIST

:START_HEADLESS
EscapeFromTarkov.exe -token=${profileId} -config={'BackendUrl':'${backendUrl}','Version':'live'} -batchmode -nographics --enable-console true
GOTO START_HEADLESS

:DLL_NOT_EXIST
ECHO Could not find 'Fika.Headless.dll'. Please install the Headless plugin before starting the client and make sure the .bat file is in the Headless installation directory where 'EscapeFromTarkov.exe' is.
PAUSE
