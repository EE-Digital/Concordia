@echo off

echo Checking packages...
call npm i >NUL 2>&1

echo Compiling app to static...
call npx expo export --output-dir ./electron/dist --platform web >NUL 2>&1


cd electron
echo Checking packages...
call npm i >NUL 2>&1

echo Compiling app to .exe package...
call npx electron-packager . Concordia --platform=win32 --arch=x64 --extra-resource="../assets" --icon="..\assets\images\icon" --overwrite --out ".\output"
@REM >NUL 2>&1
cd ..

echo Opening output directory...
explorer ".\electron\output"

timeout /t 3