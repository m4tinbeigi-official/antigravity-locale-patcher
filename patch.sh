#!/bin/bash
# Antigravity Auto Region Patch Installer

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if node is installed globally
if command -v node >/dev/null 2>&1; then
    echo "Using global Node.js to run the patch..."
    node "$SCRIPT_DIR/patch.js"
    exit $?
fi

# Fallback 1: Use embedded Node.js in Antigravity app (System or User)
EMBEDDED_NODE_SYS="/Applications/Antigravity.app/Contents/MacOS/Antigravity"
EMBEDDED_NODE_USER="$HOME/Applications/Antigravity.app/Contents/MacOS/Antigravity"

EMBEDDED_NODE=""
if [ -f "$EMBEDDED_NODE_SYS" ]; then
    EMBEDDED_NODE="$EMBEDDED_NODE_SYS"
elif [ -f "$EMBEDDED_NODE_USER" ]; then
    EMBEDDED_NODE="$EMBEDDED_NODE_USER"
fi

if [ -n "$EMBEDDED_NODE" ]; then
    echo "Global Node.js not found. Using Antigravity's embedded Node.js..."
    ELECTRON_RUN_AS_NODE=1 "$EMBEDDED_NODE" "$SCRIPT_DIR/patch.js"
    exit $?
fi

# Fallback 2: Automatically download portable Node.js binary
echo "Neither global Node.js nor Antigravity app was found in standard locations."
echo "Attempting to download a portable Node.js binary to run the patch..."

# Detect architecture
ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then
    NODE_ARCH="darwin-arm64"
elif [ "$ARCH" = "x86_64" ]; then
    NODE_ARCH="darwin-x64"
else
    echo "Error: Unsupported architecture: $ARCH"
    exit 1
fi

NODE_VER="v20.11.0"
NODE_DIR="$SCRIPT_DIR/.node_portable"
NODE_TAR="node-$NODE_VER-$NODE_ARCH.tar.gz"
NODE_URL="https://nodejs.org/dist/$NODE_VER/$NODE_TAR"

mkdir -p "$NODE_DIR"

if [ ! -f "$NODE_DIR/bin/node" ]; then
    echo "Downloading Node.js $NODE_VER for $ARCH..."
    if command -v curl >/dev/null 2>&1; then
        curl -L "$NODE_URL" -o "$NODE_DIR/$NODE_TAR"
    elif command -v wget >/dev/null 2>&1; then
        wget "$NODE_URL" -O "$NODE_DIR/$NODE_TAR"
    else
        echo "Error: Neither curl nor wget is installed. Cannot download Node.js."
        exit 1
    fi
    
    echo "Extracting Node.js..."
    tar -xzf "$NODE_DIR/$NODE_TAR" -C "$NODE_DIR" --strip-components=1
    rm "$NODE_DIR/$NODE_TAR"
    
    # Remove macOS quarantine flag if present
    if [ -f "$NODE_DIR/bin/node" ]; then
        xattr -d com.apple.quarantine "$NODE_DIR/bin/node" >/dev/null 2>&1
    fi
fi

if [ -f "$NODE_DIR/bin/node" ]; then
    echo "Successfully downloaded portable Node.js. Running the patch..."
    "$NODE_DIR/bin/node" "$SCRIPT_DIR/patch.js"
    exit $?
else
    echo "Error: Failed to set up portable Node.js."
    exit 1
fi
