#!/bin/bash
# This script will automate pushing code to github, and will ask for my git commit message every time I run it

git add .
echo "Enter your commit message"
read commit_message
git commit -m "$commit_message"
git push origin main
