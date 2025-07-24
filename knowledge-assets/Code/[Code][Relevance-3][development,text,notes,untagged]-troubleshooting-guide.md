# Fae Intelligence Troubleshooting Guide

## Quick Diagnostic Commands

### System Health Check
```bash
# Complete system status
fae-tools status

# Check if all required directories exist
ls -la ~/bin/fae-tools
ls -la ~/projects/fae-intelligence/fae-intelligence-data/
ls -la ~/fae-dashboard/index.html
ls -la ~/Downloads/Obsidian-*.AppImage
```

### Service Status Check
```bash
# Check running processes
pgrep -fa obsidian
docker ps
lsof -Pi :5678,7474,8080 -sTCP:LISTEN

# Test service connectivity
curl -s --connect-timeout 3 http://localhost:5678 && echo "n8n: OK" || echo "n8n: FAIL"
curl -s --connect-timeout 3 http://localhost:7474 && echo "Neo4j: OK" || echo "Neo4j: FAIL"
curl -s --connect-timeout 3 http://localhost:8080 && echo "Dashboard: OK" || echo "Dashboard: FAIL"
```

## Common Issues and Solutions

### Issue 1: "fae-tools: command not found"

**Symptoms:**
- Command not recognized in terminal
- Script exists but isn't executable

**Root Causes:**
- Script not in PATH
- Script not executable
- Missing ~/bin directory

**ATTEMPTED FIXES:**
```bash
# Fix 1: Locate Obsidian AppImage
find ~/Downloads -name "*Obsidian*.AppImage" 2>/dev/null

# Fix 2: Make AppImage executable
chmod +x ~/Downloads/Obsidian-*.AppImage

# Fix 3: Test manual launch with sandbox disabled
~/Downloads/Obsidian-1.8.10.AppImage --no-sandbox

# Fix 4: Update path in fae-tools script
nano ~/bin/fae-tools
# Change OBSIDIAN_PATH variable to correct location
```

**CONFIRMED SOLUTIONS:**
- ✅ Adding --no-sandbox flag resolves Linux sandbox issues
- ✅ Correct path detection prevents launch failures

### Issue 3: Neo4j/n8n Services Not Running

**Symptoms:**
- "Service not responding" errors
- HTTP connection failures
- Docker containers stopped

**Root Causes:**
- Docker containers not started
- Services crashed
- Port conflicts

**ATTEMPTED FIXES:**
```bash
# Fix 1: Check Docker status
sudo systemctl status docker
sudo systemctl start docker

# Fix 2: List and start containers
docker ps -a
docker start neo4j
docker start n8n

# Fix 3: Check port conflicts
lsof -Pi :7474 -sTCP:LISTEN
lsof -Pi :5678 -sTCP:LISTEN

# Fix 4: Restart containers if needed
docker restart neo4j n8n

# Fix 5: Check container logs
docker logs neo4j
docker logs n8n
```

**CONFIRMED SOLUTIONS:**
- ✅ `docker start [container]` resolves stopped container issues
- ✅ Checking logs identifies configuration problems

### Issue 4: Web Dashboard Won't Start

**Symptoms:**
- Dashboard fails to load
- Port 8080 conflicts
- Python server errors

**Root Causes:**
- Port already in use
- Missing dashboard files
- Python not available

**ATTEMPTED FIXES:**
```bash
# Fix 1: Check port availability
lsof -Pi :8080 -sTCP:LISTEN

# Fix 2: Kill conflicting processes
pkill -f "python3.*8080"

# Fix 3: Verify dashboard files exist
ls -la ~/fae-dashboard/index.html

# Fix 4: Test manual dashboard start
cd ~/fae-dashboard
python3 -m http.server 8080

# Fix 5: Use alternative port
cd ~/fae-dashboard
python3 -m http.server 8081
```

**CONFIRMED SOLUTIONS:**
- ✅ Killing conflicting processes frees up port 8080
- ✅ Manual server start identifies file/permission issues

### Issue 5: Knowledge Vault Missing or Corrupted

**Symptoms:**
- Obsidian vault not found
- Missing directory structure
- File permission errors

**Root Causes:**
- Vault directory not created
- Wrong permissions
- Path misconfiguration

**ATTEMPTED FIXES:**
```bash
# Fix 1: Create vault structure
mkdir -p ~/projects/fae-intelligence/fae-intelligence-data
mkdir -p ~/projects/fae-intelligence/fae-intelligence-data/{01-Inbox,02-Projects,03-Areas,04-Resources,05-Archive}

# Fix 2: Fix permissions
chmod 755 ~/projects/fae-intelligence/fae-intelligence-data
find ~/projects/fae-intelligence/fae-intelligence-data -type d -exec chmod 755 {} \;

# Fix 3: Verify path in fae-tools
grep KNOWLEDGE_VAULT ~/bin/fae-tools

# Fix 4: Test Obsidian vault access
obsidian ~/projects/fae-intelligence/fae-intelligence-data
```

**CONFIRMED SOLUTIONS:**
- ✅ Creating proper directory structure resolves vault issues
- ✅ Correct permissions enable Obsidian access

### Issue 6: VS Code/Development Environment Fails

**Symptoms:**
- VS Code won't launch
- Terminal doesn't open
- Path errors

**Root Causes:**
- VS Code not installed
- Terminal command not found
- Project directory missing

**ATTEMPTED FIXES:**
```bash
# Fix 1: Check if VS Code is installed
which code || echo "VS Code not found"

# Fix 2: Install VS Code if missing
# Ubuntu/Debian:
sudo apt update && sudo apt install code

# Fix 3: Test terminal alternatives
which gnome-terminal || which konsole || which xterm

# Fix 4: Create project directory
mkdir -p ~/projects/fae-intelligence

# Fix 5: Use file manager fallback
xdg-open ~/projects/fae-intelligence
```

**CONFIRMED SOLUTIONS:**
- ✅ Installing VS Code resolves launch failures
- ✅ File manager fallback provides alternative access

## Advanced Debugging

### Enable Verbose Logging

```bash
# Add debug mode to fae-tools
export FAE_TOOLS_DEBUG=1

# Create debug version of script
cp ~/bin/fae-tools ~/bin/fae-tools-debug
# Edit debug version to add logging
```

### System Dependencies Check

```bash
# Check all required dependencies
cat > ~/check-dependencies.sh << 'EOF'
#!/bin/bash

echo "🔍 Checking Fae Intelligence Dependencies..."

# Check Docker
if command -v docker > /dev/null; then
    echo "✅ Docker: $(docker --version)"
    docker ps > /dev/null 2>&1 && echo "✅ Docker daemon: Running" || echo "❌ Docker daemon: Stopped"
else
    echo "❌ Docker: Not installed"
fi

# Check Python
if command -v python3 > /dev/null; then
    echo "✅ Python3: $(python3 --version)"
else
    echo "❌ Python3: Not installed"
fi

# Check VS Code
if command -v code > /dev/null; then
    echo "✅ VS Code: Available"
else
    echo "⚠️ VS Code: Not installed (optional)"
fi

# Check Obsidian
if ls ~/Downloads/Obsidian-*.AppImage > /dev/null 2>&1; then
    echo "✅ Obsidian: Found $(ls ~/Downloads/Obsidian-*.AppImage | head -1)"
else
    echo "❌ Obsidian: AppImage not found in ~/Downloads/"
fi

# Check file structure
echo ""
echo "📁 File Structure Check:"
[ -f ~/bin/fae-tools ] && echo "✅ fae-tools script" || echo "❌ fae-tools script missing"
[ -d ~/projects/fae-intelligence ] && echo "✅ Project directory" || echo "❌ Project directory missing"
[ -d ~/projects/fae-intelligence/fae-intelligence-data ] && echo "✅ Knowledge vault" || echo "❌ Knowledge vault missing"
[ -f ~/fae-dashboard/index.html ] && echo "✅ Web dashboard" || echo "❌ Web dashboard missing"

echo ""
echo "🔗 Network Connectivity Check:"
curl -s --connect-timeout 3 http://localhost:5678 > /dev/null && echo "✅ n8n (5678)" || echo "❌ n8n (5678)"
curl -s --connect-timeout 3 http://localhost:7474 > /dev/null && echo "✅ Neo4j (7474)" || echo "❌ Neo4j (7474)"
curl -s --connect-timeout 3 http://localhost:8080 > /dev/null && echo "✅ Dashboard (8080)" || echo "❌ Dashboard (8080)"
EOF

chmod +x ~/check-dependencies.sh
~/check-dependencies.sh
```

### Service Recovery Scripts

```bash
# Create service recovery script
cat > ~/bin/fae-recovery << 'EOF'
#!/bin/bash

echo "🔧 Fae Intelligence System Recovery"

# Stop all services
echo "🛑 Stopping services..."
pkill -f obsidian
pkill -f "python3.*8080"
docker stop neo4j n8n 2>/dev/null

# Wait for clean shutdown
sleep 3

# Restart Docker containers
echo "🐳 Starting Docker services..."
docker start neo4j
docker start n8n

# Wait for services to initialize
sleep 5

# Check service health
echo "📊 Checking service health..."
curl -s --connect-timeout 5 http://localhost:7474 > /dev/null && echo "✅ Neo4j: Healthy" || echo "❌ Neo4j: Failed"
curl -s --connect-timeout 5 http://localhost:5678 > /dev/null && echo "✅ n8n: Healthy" || echo "❌ n8n: Failed"

echo "🎉 Recovery complete. Run 'fae-tools status' to verify."
EOF

chmod +x ~/bin/fae-recovery
```

## Emergency Procedures

### Complete System Reset

```bash
# Create system reset script (USE WITH CAUTION)
cat > ~/bin/fae-reset << 'EOF'
#!/bin/bash

echo "⚠️  WARNING: This will reset the Fae Intelligence system"
read -p "Are you sure? (type 'RESET' to confirm): " confirm

if [ "$confirm" = "RESET" ]; then
    echo "🔄 Resetting system..."
    
    # Stop all services
    pkill -f obsidian
    pkill -f "python3.*8080"
    docker stop neo4j n8n 2>/dev/null
    
    # Remove and recreate directories
    rm -rf ~/fae-dashboard
    rm -rf ~/projects/fae-intelligence/fae-intelligence-data
    
    # Recreate structure
    mkdir -p ~/fae-dashboard
    mkdir -p ~/projects/fae-intelligence/fae-intelligence-data
    
    echo "✅ System reset complete. Run installation steps again."
else
    echo "❌ Reset cancelled."
fi
EOF

chmod +x ~/bin/fae-reset
```

### Backup and Restore

```bash
# Create backup script
cat > ~/bin/fae-backup << 'EOF'
#!/bin/bash

BACKUP_DIR="~/fae-intelligence-backup-$(date +%Y%m%d-%H%M)"
mkdir -p "$BACKUP_DIR"

echo "💾 Creating backup at $BACKUP_DIR..."

# Backup key directories
cp -r ~/bin/fae-tools "$BACKUP_DIR/"
cp -r ~/fae-dashboard "$BACKUP_DIR/"
cp -r ~/projects/fae-intelligence/fae-intelligence-data "$BACKUP_DIR/"

echo "✅ Backup complete at $BACKUP_DIR"
EOF

chmod +x ~/bin/fae-backup
```

## Contact and Support

### Self-Help Resources

1. **Documentation**: Unified Frontend System Documentation
2. **Status Check**: `fae-tools status`
3. **Dependencies**: `~/check-dependencies.sh`
4. **Recovery**: `fae-recovery`

### Escalation Path

1. Run diagnostic commands
2. Check ATTEMPTED FIXES section for your issue
3. Try CONFIRMED SOLUTIONS
4. Document new issues in troubleshooting guide
5. Update documentation with successful solutions

---

**Remember**: Always document attempted fixes and their results to build the knowledge base for future troubleshooting.
```bash
# Fix 1: Check and add to PATH
echo $PATH | grep -q "$HOME/bin" || echo "PATH missing ~/bin"
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Fix 2: Make script executable
chmod +x ~/bin/fae-tools

# Fix 3: Verify script exists
ls -la ~/bin/fae-tools
```

**CONFIRMED SOLUTIONS:**
- ✅ Adding ~/bin to PATH resolves command not found
- ✅ chmod +x fixes permission issues

### Issue 2: "Obsidian not found" or Won't Launch

**Symptoms:**
- Obsidian fails to start
- "AppImage not found" error
- Sandbox errors

**Root Causes:**
- Wrong path to Obsidian AppImage
- Missing --no-sandbox flag
- AppImage not executable

**ATTEMPTED FIXES
