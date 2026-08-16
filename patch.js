process.noAsar = true;
const fs = require('fs');
const path = require('path');

// Support both system-wide and user-specific Applications folders
const possibleAppPaths = [
    '/Applications/Antigravity.app',
    path.join(process.env.HOME || '', 'Applications/Antigravity.app')
];

let appPath = possibleAppPaths.find(p => fs.existsSync(p));

console.log('--- Antigravity Auto Patch Script ---');

if (!appPath) {
    console.error('Error: Antigravity is not installed in standard locations.');
    console.error('Looked in:');
    possibleAppPaths.forEach(p => console.error(`  - ${p}`));
    process.exit(1);
}

console.log(`Found Antigravity at: ${appPath}`);
const resourcesPath = path.join(appPath, 'Contents/Resources');
const asarPath = path.join(resourcesPath, 'app.asar');
const backupPath = path.join(resourcesPath, 'app.asar.bak');
const tempDir = path.join(__dirname, 'antigravity_temp_extracted');

// 1. Back up original asar
if (!fs.existsSync(backupPath)) {
    console.log('Creating backup of app.asar...');
    fs.copyFileSync(asarPath, backupPath);
} else {
    console.log('Backup already exists.');
}

// 2. Clean up old temp dir if exists
if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
}

// Custom Pure-JS ASAR Extractor
function extractAsar(asarFilePath, destFolderPath) {
    const fd = fs.openSync(asarFilePath, 'r');
    const sizeBuf = Buffer.alloc(16);
    fs.readSync(fd, sizeBuf, 0, 16, 0);
    const headerSize = sizeBuf.readUInt32LE(12);
    const headerBuf = Buffer.alloc(headerSize);
    fs.readSync(fd, headerBuf, 0, headerSize, 16);
    const headerStr = headerBuf.toString('utf8').replace(/\0+$/, '').trim();
    const header = JSON.parse(headerStr);
    const payloadOffset = 16 + headerSize;

    function extract(node, currentPath) {
        if (node.files) {
            for (const [name, info] of Object.entries(node.files)) {
                const itemPath = path.join(currentPath, name);
                if (info.files) {
                    fs.mkdirSync(itemPath, { recursive: true });
                    extract(info, itemPath);
                } else {
                    const fileBuf = Buffer.alloc(info.size);
                    fs.readSync(fd, fileBuf, 0, info.size, payloadOffset + parseInt(info.offset));
                    fs.mkdirSync(path.dirname(itemPath), { recursive: true });
                    fs.writeFileSync(itemPath, fileBuf);
                }
            }
        }
    }
    fs.mkdirSync(destFolderPath, { recursive: true });
    extract(header, destFolderPath);
    fs.closeSync(fd);
}

// Custom Pure-JS ASAR Packer
function packAsar(srcFolderPath, destAsarFilePath) {
    const filesList = [];
    
    function buildHeader(dirPath) {
        const result = { files: {} };
        const items = fs.readdirSync(dirPath);
        for (const item of items) {
            if (item === '.DS_Store') continue;
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                result.files[item] = buildHeader(fullPath);
            } else {
                filesList.push(fullPath);
                result.files[item] = {
                    size: stat.size,
                    offset: ""
                };
            }
        }
        return result;
    }
    
    const header = buildHeader(srcFolderPath);
    
    let currentOffset = 0;
    function updateOffsets(node) {
        if (node.files) {
            for (const [name, info] of Object.entries(node.files)) {
                if (info.files) {
                    updateOffsets(info);
                } else {
                    info.offset = currentOffset.toString();
                    currentOffset += info.size;
                }
            }
        }
    }
    updateOffsets(header);
    
    const headerJson = JSON.stringify(header);
    const headerBuf = Buffer.from(headerJson, 'utf8');
    const alignSize = (4 - (headerBuf.length % 4)) % 4;
    const paddedHeaderBuf = Buffer.concat([headerBuf, Buffer.alloc(alignSize)]);
    const headerSize = paddedHeaderBuf.length;
    
    const sizeBuf = Buffer.alloc(16);
    sizeBuf.writeUInt32LE(4, 0);
    sizeBuf.writeUInt32LE(headerSize + 8, 4);
    sizeBuf.writeUInt32LE(headerSize + 4, 8);
    sizeBuf.writeUInt32LE(headerSize, 12);
    
    const writeStream = fs.createWriteStream(destAsarFilePath);
    writeStream.write(sizeBuf);
    writeStream.write(paddedHeaderBuf);
    
    for (const filePath of filesList) {
        const data = fs.readFileSync(filePath);
        writeStream.write(data);
    }
    writeStream.end();
}

// 3. Extract asar
console.log('Extracting app.asar...');
try {
    extractAsar(asarPath, tempDir);
} catch (err) {
    console.error('Failed to extract app.asar programmatically:', err);
    process.exit(1);
}

// 4. Modify preload.js
const preloadPath = path.join(tempDir, 'dist/preload.js');
if (fs.existsSync(preloadPath)) {
    console.log('Patching preload.js...');
    let content = fs.readFileSync(preloadPath, 'utf8');
    
    const spoofCode = `
// Spoof Timezone and Locale to US/English
try {
    const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions;
    Intl.DateTimeFormat.prototype.resolvedOptions = function() {
        const options = originalResolvedOptions.call(this);
        options.timeZone = 'America/New_York';
        return options;
    };
    Object.defineProperty(navigator, 'language', {
        get: () => 'en-US',
        configurable: true
    });
    Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
        configurable: true
    });
} catch (e) {
    console.error('Failed to spoof locale/timezone:', e);
}
`;
    
    // Inject right after "use strict";
    if (!content.includes('Spoof Timezone and Locale')) {
        content = content.replace('"use strict";', `"use strict";\n${spoofCode}`);
        fs.writeFileSync(preloadPath, content, 'utf8');
        console.log('preload.js patched successfully.');
    } else {
        console.log('preload.js is already patched.');
    }
} else {
    console.error('Error: preload.js not found.');
    process.exit(1);
}

// 5. Modify languageServer.js
const lsPath = path.join(tempDir, 'dist/languageServer.js');
if (fs.existsSync(lsPath)) {
    console.log('Patching languageServer.js...');
    let content = fs.readFileSync(lsPath, 'utf8');
    
    const target = `const env = { ...process.env, ...(0, shell_env_1.shellEnvSync)() };`;
    const replacement = `const env = { ...process.env, ...(0, shell_env_1.shellEnvSync)(), TZ: 'America/New_York', LANG: 'en_US.UTF-8', LC_ALL: 'en_US.UTF-8' };`;
    
    if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(lsPath, content, 'utf8');
        console.log('languageServer.js patched successfully.');
    } else if (content.includes('TZ: \'America/New_York\'')) {
        console.log('languageServer.js is already patched.');
    } else {
        console.error('Error: Could not find target environment creation line in languageServer.js.');
        process.exit(1);
    }
} else {
    console.error('Error: languageServer.js not found.');
    process.exit(1);
}

// 6. Repack asar
console.log('Packing app.asar back...');
try {
    packAsar(tempDir, asarPath);
    console.log('Successfully repacked app.asar.');
} catch (err) {
    console.error('Failed to pack app.asar programmatically:', err);
    process.exit(1);
}

// 7. Cleanup temp dir
console.log('Cleaning up temporary files...');
fs.rmSync(tempDir, { recursive: true, force: true });

console.log('\n--- Patch Completed Successfully! ---');
console.log('Please restart Antigravity.');
