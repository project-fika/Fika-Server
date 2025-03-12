Param(
    [Parameter(Mandatory = $false)]
    [Switch] $Overwrite,

    [Parameter(Mandatory = $false)]
    [string] $Branch,

    [Parameter(Mandatory = $false)]
    [string] $Commit,

    [Parameter(Mandatory = $true)]
    [string] $FIKACoopVer
)

$ErrorActionPreference = "Stop"
$SOURCE_REPO = "https://github.com/sp-tarkov/server.git"
$SERVER_DIR = "./Spt-Server"
$ZIP_Folder = "./tempZipContents"

# build coop mod
npm i
npm run build

if ($LASTEXITCODE -ne 0) {
    throw "coop mod npm run build failed, exit code $LASTEXITCODE"
}

# clone spt server
if (Test-Path -Path $SERVER_DIR) {
    if ($Overwrite -or (Read-Host "$SERVER_DIR exists, delete? [y/n]") -eq 'y') {
        Write-Output "$SERVER_DIR exists, removing"
        Remove-Item -Recurse -Force $SERVER_DIR
    }
    else {
        Exit 1
    }
}

Write-Output "clone repo"
if ($Branch.Length -gt 0) {
    Write-Output "Cloning branch/tag $Branch"
    git clone --depth 1 -b $Branch $SOURCE_REPO $SERVER_DIR
} else {
    Write-Output "Cloning default branch"
    git clone --depth 1 $SOURCE_REPO $SERVER_DIR
}

Set-Location $SERVER_DIR

if ($Commit.Length -gt 0) {
    Write-Output "Checking out the commit $Commit"
    git fetch --depth=1 $SOURCE_REPO $Commit
    git checkout $Commit

    if ($LASTEXITCODE -ne 0) {
        throw "Commit $Commit checkout failed. It doesn't exist? git exit code $LASTEXITCODE"
    }
} else {
    $Commit = git rev-parse HEAD
}

$packageJsonPath = "./project/package.json"
$sptVer = (Get-Content $packageJsonPath -Raw | ConvertFrom-Json).version
Write-Output "SPT_VERSION=$sptVer" >> "$env:GITHUB_OUTPUT"

Write-Output "lfs"
git lfs fetch
git lfs pull

Write-Output "build"
Set-Location ./project

if ($IsWindows) {
    npm install
    npm run build:release
} else {
    rm -rf node_modules
    rm -f package-lock.json
    npm cache clean --force

    npm install
    npm run build:release
}



if ($LASTEXITCODE -ne 0) {
    throw "npm run build:release failed, exit code $LASTEXITCODE"
}

Set-Location ../../

New-Item -ItemType Directory -Force -Path "$ZIP_Folder/user/mods/FIKACoop"
Copy-Item -Path "$SERVER_DIR/project/build\*" -Destination "$ZIP_Folder" -Recurse
Copy-Item -Path "./dist/*" -Destination "$ZIP_Folder/user/mods/FIKACoop" -Recurse -Exclude "fika-server.zip"

# make release package
if ($IsWindows) {
    $CommitShort = $Commit.Substring(0, 6)
    $ZipName = "FIKACoop-$FIKACoopVer-Withspt$sptVer-$CommitShort-win.zip"
    Compress-Archive -Path "$ZIP_Folder/*" -DestinationPath "$ZipName" -Force
} else {
    $CommitShort = $Commit.Substring(0, 6)
    $ZipName = "FIKACoop-$FIKACoopVer-Withspt$sptVer-$CommitShort-linux.tar.gz"
    Set-Location "$ZIP_Folder"
    tar --overwrite -czf "../$ZipName" ./*
}

# After calculating $ZipName, $sptVer, and $CommitShort
Write-Output "ZIP_NAME=$ZipName" | Out-File -Append -FilePath $Env:GITHUB_ENV
Write-Output "SPT_VERSION=$sptVer" | Out-File -Append -FilePath $Env:GITHUB_ENV
Write-Output "COMMIT_SHORT=$CommitShort" | Out-File -Append -FilePath $Env:GITHUB_ENV
