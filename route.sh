#!/bin/bash
# git workflow v8.0
# 2024 @arfazhxss

breakStrSize=50
breakStrIter=$(printf '_%.0s' $(seq 1 "$breakStrSize"))
currentBranch=$(git rev-parse --abbrev-ref HEAD)

function versionCheck() {
  git config advice.addIgnoredFile false
  dir="$(dirname "$0")/.git"
  if [ ! -d "$dir" ]
  then
    echo -e "No Version Control History Found\nInitializing Git Version Control"
    git --version 
    git init
    flag=1
  else
    echo -e "\nVersion Control History found"
  fi
}

function syncBranch() {
  echo -e "YES'ED\n${breakStrIter}"
  git stash
  git pull --rebase --autostash --quiet
  git stash clear
  echo -e "${breakStrIter}\n\t\tYour Repository is synced\n\t\twith the latest commit :)\n${breakStrIter}"
}

function pushChanges() {
  if [[ "$currentBranch" != "$branch" ]]; then
    echo "Error: Current branch ($currentBranch) and push target branch ($branch) are different."
    return
  fi

  mostRecentCommitLog=$(git log -1)
  gitCommitInf=$(echo "$mostRecentCommitLog" | grep 'Author:' | cut -d ' ' -f2 | sed 's/[^<]*<\([^>]*\).*/\1/')

  if [ "$gitCommitInf" == "Arfaz" ]; then
    gitCommitInf="Commit by @arfazhxss"
  elif [ -z "$gitCommitInf" ]; then
    gitCommitInf=""
  else
    gitCommitInf="Commit by "$gitCommitInf
  fi

  git add . && git add -u && \
  git commit -m "$CommitMessage"$'\n'"$gitCommitInf"' on '"$(date +'%a %d %b %Y')" && \
  if git push --set-upstream origin "$branch" --quiet; then
    rm -Rf .DS_Store/
    echo -e "${breakStrIter}\n\t\tYour changes have been pushed\n\t\tto the repository :)\n${breakStrIter}"
  else
    echo -e "${breakStrIter}\n\t\tError: Failed to push changes to the repository\n${breakStrIter}"
  fi
}

function gitWorkflow() {
  find . -name ".DS_Store" -type f -delete
  versionCheck
  echo -e "\n${breakStrIter}\n\n\t\tDELETE LOCAL CHANGES? (YES) \n\t\t\tOR\n\t\tPUSH LOCAL CHANGES (ENTER)\n"
  read -s -n 3 -p "(yes/ENTER): " answer

  if [[ $answer == "yes" || $answer == "Yes" || $answer == "YES" ]]; then
    syncBranch
  else
    echo -e "ENTER'ED\n${breakStrIter}"
    read -p "Your Commit Message: " CommitMessage

    if [[ -z "$CommitMessage" || ${#CommitMessage} -lt 3 ]]; then
      CommitMessage="Routine Commit"
      echo "For your information, the branch you're in is: {$currentBranch}"
      read -p "Enter the branch to push the code to (default: main): " branch
      branch=${branch:-main}
      pushChanges
    else
      echo "For your information, the branch you're in is: {$currentBranch}"
      read -p "Enter the branch to push the code to: " branch
      branch=${branch:-main}
      pushChanges
    fi
  fi
}

# Call the gitWorkflow function
gitWorkflow
