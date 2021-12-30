#/bin/bash
while true
do
  cd /home/andy/status-led
  node ./index.js
  echo Reboot
  #You can add other commands to do at each reboot here
  #(backup or log rotation for example)
  sleep 5
done
