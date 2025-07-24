## Resolving Claude Desktop (Unofficial) MCP Server and Docker File Access Issues on Linux

### 1. Setting Up an MCP Server for Claude Desktop (Unofficial) on Linux

You can run Claude Desktop on Linux using an unofficial build such as via a Nix Flake or a community-maintained package. Claude Desktop supports adding MCP (Model Context Protocol) servers for local functionality like filesystem access or external tool integration[1][2][3].

**Typical steps to launch an MCP server with Claude Desktop:**

- Locate and edit the `claude_desktop_config.json` file. On many Linux setups, this file is at `~/.config/Claude/claude_desktop_config.json`[2].
- To set up a filesystem MCP server so Claude can access local directories, your configuration could look like:
  ```json
  {
    "mcpServers": {
      "filesystem": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-filesystem",
          "/home/YOUR_USERNAME/Documents",
          "/home/YOUR_USERNAME/Projects"
        ]
      }
    }
  }
  ```
  Replace `YOUR_USERNAME` with your actual username and specify any folders you want Claude to access[4][5].

- Make sure Node.js is installed, as this MCP server runs with Node (check via `node --version`)[5].
- Save the config file and restart Claude Desktop.

### 2. Ensuring Directory Read/Write Access for Claude and Docker

#### Understanding Docker Permissions

When you bind-mount a host folder into a Docker container (how Docker Desktop and some Claude MCP servers work), permissions issues are common:

- **Read** issues occur if the container’s user does not have permission to read the host folder.
- **Write** issues occur if either
  - the container's user does not have write permissions to the folder, or
  - files created in the container are not writable by your host user, or vice versa[6][7][8].

#### Solutions for Reliable Read/Write Access

- **Mount the Folder With Correct Permissions:**
  When running (or configuring) your Docker-based MCP server, mount the desired folder and ensure permissions allow both your Linux user and the container's user/group to write. Example Docker syntax:
  ```
  docker run -v /home/youruser/PROJECT:/mnt/project:rw ...
  ```
  The `:rw` at the end ensures read/write[9].

- **Match User and Group IDs:**
  Docker containers often run as root (UID 0), but files they write may be only root-writable. To avoid this:
  - Run the container as your user by specifying the UID/GID with `--user $(id -u):$(id -g)`:
    ```
    docker run --user $(id -u):$(id -g) -v /home/youruser/PROJECT:/mnt/project:rw ...
    ```
    This way, files created by the container are owned by your Linux user[6][8].
  - Alternatively, ensure your host directory’s permissions (`chown` and `chmod`) grant your user and group access.

- **Permissions on the Host Folder:**
  Set necessary permissions on the target folder, e.g.:
  ```
  chmod g+rw /home/youruser/PROJECT
  chown youruser:yourusergroup /home/youruser/PROJECT
  ```
  If multiple users (host and container) must write, you may need a shared group, or group `777` permissions (use with caution for sensitive data)[10][11].

- **Persistent Configuration for Claude MCP:**
  - On Linux, use `"args": ["/host/path"]` for every directory you want accessible (read/write).
  - After changes, fully restart Claude Desktop for settings to take effect[5][12].

### 3. CRITICAL: Docker Container Path Mapping for Desktop Commander MCP

**⚠️ IMPORTANT PATH MAPPING ISSUE:**

When using Desktop Commander MCP in Docker (container name: `mcp-desktop`), there is a critical path mapping that affects file operations:

- **Your real file system**: `/home/rosie/projects/`
- **Container's internal path**: `/home/rosie/projects/` (WRONG - this is isolated!)
- **Correct path to your real files**: `/host/home/rosie/projects/` (CORRECT)

**The Problem:**
Desktop Commander runs in a Docker container with this mount configuration:
```
"Source": "/home/rosie",
"Destination": "/host/home/rosie"
```

This means your real `/home/rosie` directory is mounted INSIDE the container at `/host/home/rosie`. 

**The Solution:**
Always use `/host/home/rosie/` prefix when working with Desktop Commander:

```bash
# WRONG - creates files in container's isolated filesystem
/home/rosie/projects/myfile.txt

# CORRECT - creates files in your actual filesystem  
/host/home/rosie/projects/myfile.txt
```

**How to Verify This is Working:**
1. Create a test file: `/host/home/rosie/projects/test_claude_write.txt`
2. Check from your terminal: `ls -la /home/rosie/projects/test_claude_write.txt`
3. If you see the file, the path mapping is working correctly

**Container Mount Details:**
```json
"Mounts": [
  {
    "Type": "bind",
    "Source": "/home/rosie",
    "Destination": "/host/home/rosie",
    "Mode": "",
    "RW": true,
    "Propagation": "rprivate"
  }
]
```

### 4. Additional Tips

- Claude typically asks for confirmation before performing file operations, keeping things secure[5].
- Use `ls -l` and `id` on both host and container to troubleshoot ownership issues.
- If using Docker Compose, you can specify user, volumes, and permissions in the `docker-compose.yml`.

**Summary Table: Key Settings and Permissions**

| Setting/Step                        | What to Do                                                       | Why It's Important                             |
|--------------------------------------|------------------------------------------------------------------|------------------------------------------------|
| Add directories to MCP config        | List each target directory in `args`                             | Enables Claude to see/use folders[4][5]        |
| Mount host folder in Docker          | `docker run -v /host:/container:rw`                              | Ensures Docker can see/use the folder[9]       |
| Use correct user in Docker           | `--user $(id -u):$(id -g)`                                       | Prevents root ownership/write issues[6][8]   |
| Set host folder permissions          | `chmod g+rw`, `chown user:group`                                 | Fixes read/write errors on shared folders[10]  |
| Restart Claude Desktop               | Fully quit and re-launch                                         | Loads new MCP server config[5]                 |

**References:**  
For step-by-step Linux and Docker instructions, see detailed guides and community discussions[4][1][5][9][6][7][10][11][8].  

If these steps do not fully resolve your issue, please specify if you see particular errors or permission denied messages and I can help you further tune your setup.

[1] https://www.greghilston.com/post/claude-desktop-on-linux/
[2] https://github.com/whit3rabbit0/project_astro
[3] https://github.com/k3d3/claude-desktop-linux-flake
[4] https://modelcontextprotocol.io/quickstart/user
[5] https://app.studyraid.com/en/read/23716/957072/local-file-access-permission-configuration
[6] https://www.reddit.com/r/docker/comments/pyf4o7/how_to_write_file_with_complete_permission_from/
[7] https://www.anthropic.com/engineering/desktop-extensions
[8] https://stackoverflow.com/questions/71918710/allow-docker-container-host-user-to-write-on-bind-mounted-host-directory
[9] https://www.mastertheboss.com/soa-cloud/docker/docker-how-to-access-files-on-the-host-from-within-a-container/
[10] https://forums.docker.com/t/trouble-with-volume-permissions/118503
[11] https://linuxconfig.org/how-to-share-data-between-a-docker-container-and-host-system-using-volumes
[12] https://zapier.com/blog/claude-mcp-servers/?msockid=3b6b801b1fdd619818fa960c1e356099
[13] https://www.reddit.com/r/MCPservers/comments/1lw1jwe/how_do_you_actually_set_up_an_mcp_server_on/
[14] https://x.com/permutans/status/1896984997619491330
[15] https://docs.anthropic.com/en/docs/claude-code/iam
[16] https://stackoverflow.com/questions/45236106/why-does-docker-cp-of-directory-hierarchy-out-of-container-fail-with-permission
[17] https://stackoverflow.com/questions/55047708/make-directory-of-docker-container-readable-on-host/55106319
[18] https://www.youtube.com/watch?v=vDT1_b5eEkM
[19] https://github.com/anthropics/claude-code/issues/1736
[20] https://scottspence.com/posts/configuring-mcp-tools-in-claude-code