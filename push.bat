@echo off
cd /d D:\Working_Projects\networking-learning-hub

echo ==========================
echo STEP 1: Adding Changes
echo ==========================
git add .

echo ==========================
echo STEP 2: Committing
echo ==========================
git commit -m "New files"

echo ==========================
echo STEP 3: Pushing
echo ==========================
git push

echo ==========================
echo DONE
echo ==========================
pause
