#!/bin/bash

git add . && git commit -m 'auto commit' --amend && git push origin main -f

echo -e "\033[0;32mOperation completed. Press any key to exit...\033[0m"
read -n 1 -s