⚠️ CRITICAL: DESKTOP COMMANDER PATH MAPPING
=============================================

🚨 MANDATORY FOR ALL FILE OPERATIONS:

When using Desktop Commander MCP, ALWAYS use /host/ prefix:

❌ WRONG: /home/rosie/projects/file.txt
✅ CORRECT: /host/home/rosie/projects/file.txt

WHY: Desktop Commander runs in Docker container with:
Your real /home/rosie/ → Container's /host/home/rosie/

TEST: After creating files, user can verify with:
ls -la /home/rosie/projects/filename.txt

FULL DOCS: /docs/CLAUDE_DESKTOP_MCP_DOCKER_SETUP.md
