
echo "start commit & push script"
git config --global user.name 'action bot' 
echo "set username to action bot"
git add -A
echo "add to stage : complete"
RESULT=$(git commit -am "auto-update README.md" | grep "꺠끗함")
if [ $RESULT = ]
echo $RESULT
