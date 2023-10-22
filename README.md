# llama-ls

To install dependencies:

```bash
bun install
```

Though created with bun, this requires node.js

To use:

### Add to path
```bash
# adds llama-ls to your path
npm link
```

### Run llama.cpp

```sh
# run llama.cpp in another directory
cd ~/ws/llama.cpp
./server -m models/codellama-7b.Q5_K_M.gguf -c 5000
```

### Run lsp with neovim and lspconfig

```lua
-- ~/.vim/plugged/nvim-lspconfig/lua/lspconfig/server_configurations/llama_ls.lua
local util = require 'lspconfig.util'

return {
  default_config = {
    cmd = { 'llama-ls', '--stdio' },
    -- cmd = { 'node', '/Users/blu/ws/vscode-extension-samples/lsp-sample/server/out/server.js', '--stdio' },
    filetypes = { 'text', 'javascript', 'typescript' },
    root_dir = util.find_git_ancestor,
  },
  docs = {
    description = [[
llama-ls is a basic codellama infill tool
]]   ,
  },
}

```

Run setup with lspconfig

```lua
lspconfig.llama_ls.setup {}
```
