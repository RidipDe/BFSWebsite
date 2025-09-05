#!/bin/bash

# chmod +x BFSWebsite_setup.sh
# ./BFSWebsite_setup.sh
#Add the following line to run the script at every reboot and at fixed times:
#

# [Unit]
# Description=BFS Update Script
# After=network.target

# [Service]
# ExecStart=/bin/bash /root/BFSWebsite_setup.sh
# WorkingDirectory=/
# Restart=on-failure
# User=root

# [Install]
# WantedBy=multi-user.target


# [Unit]
# Description=Run BFS Update Script

# [Timer]
# OnBootSec=1min        # Start 1 minute after boot
# OnUnitActiveSec=24h   # Run every 24 hours (this will be overridden by individual time settings)
# OnCalendar=*-*-* 02:00:00
# OnCalendar=*-*-* 14:00:00
# OnCalendar=*-*-* 18:00:00

# [Install]
# WantedBy=timers.target

# sudo vim /var/spool/cron/crontabs/root

# # Run every hour on the hour
# 0 * * * * /bin/bash /root/BFSWebsite_setup.sh

# # Run after reboot
# @reboot /bin/bash /root/BFSWebsite_setup.sh




# Variables
BFS_DIR="BFSWebsite"                      # Path to the BFS directory
GIT_REPO_URL="https://github.com/RidipDe/BFSWebsite" # URL of the git repository
LOG_FILE="bfs_script.log"   # Log file location
PORT=3002                           # Port to check for existing npm process

# Logging function
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Ensure the script is running with root privileges
if [ "$(id -u)" -ne 0 ]; then
  log "Script must be run as root"
  exit 1
fi

log "Starting BFS update script..."

# Check if the BFS directory exists
if [ -d "$BFS_DIR" ]; then
  log "BFS directory exists. Pulling the latest changes..."
  # Navigate to the BFS directory
  cd "$BFS_DIR" || { log "Failed to enter BFS directory"; exit 1; }
  
  # Pull the latest code from the repository
  git fetch origin || { log "Failed to fetch updates from Git repository"; exit 1; }
  git reset --hard origin/master || { log "Failed to reset to the latest code"; exit 1; }
else
  log "BFS directory does not exist. Cloning repository..."
  # Clone the BFS repository if the directory does not exist
  git clone "$GIT_REPO_URL" "$BFS_DIR" || { log "Git clone failed"; exit 1; }
  cd "$BFS_DIR" || { log "Failed to enter BFS directory after cloning"; exit 1; }
fi

# Ensure Node.js and npm are installed
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
  log "Node.js or npm is not installed"
  exit 1
fi

# Install npm dependencies (before killing the existing process)
log "Installing npm dependencies..."
npm install || { log "npm install failed"; exit 1; }

# Check if the application is already running on port 3002
log "Checking for existing npm process on port $PORT..."
PID=$(lsof -t -i:$PORT)
if [ ! -z "$PID" ]; then
  log "Existing npm process found with PID $PID on port $PORT. Killing the old process..."
  # Gracefully stop the existing npm process
  kill "$PID" || { log "Failed to stop npm process with PID $PID"; exit 1; }
else
  log "No npm process found on port $PORT."
fi

# Now that the old process is stopped, start the new application
log "Starting the updated npm process..."
npm start || { log "npm start failed"; exit 1; }

log "BFS update script completed successfully."
