process.noAsar = true;
const fs = require('fs');
const path = require('path');

const colors = {
    red: '\x1b[1;31m',
    green: '\x1b[1;32m',
    yellow: '\x1b[1;33m',
    cyan: '\x1b[1;36m',
    reset: '\x1b[0m'
};

const log = {
    info: (msg) => console.log(`${colors.cyan}🔍 ${msg}${colors.reset}`),
    success: (msg) => console.log(`${colors.green}✨ ${msg}${colors.reset}`),
    warn: (msg) => console.log(`${colors.yellow}⚠️ ${msg}${colors.reset}`),
    error: (msg) => console.error(`${colors.red}❌ ${msg}${colors.reset}`)
};

function printErrorBox(title, message, details) {
    console.error(`\n${colors.red}┌────────────────────────────────────────────────────────┐${colors.reset}`);
    console.error(`${colors.red}│ ❌ ${title.padEnd(50)} │${colors.reset}`);
    console.error(`${colors.red}├────────────────────────────────────────────────────────┤${colors.reset}`);
    const wrappedMsg = wrapText(message, 52);
    wrappedMsg.forEach(line => {
        console.error(`${colors.red}│ ${line.padEnd(52)} │${colors.reset}`);
    });
    if (details) {
        console.error(`${colors.red}│                                                        │${colors.reset}`);
        const wrappedDetails = wrapText(`Details: ${details}`, 52);
        wrappedDetails.forEach(line => {
            console.error(`${colors.red}│ ${colors.yellow}${line.padEnd(52)}${colors.red} │${colors.reset}`);
        });
    }
    console.error(`${colors.red}└────────────────────────────────────────────────────────┘\n${colors.reset}`);
}

function wrapText(str, width) {
    const lines = [];
    const paragraphs = str.split('\n');
    paragraphs.forEach(para => {
        let currentLine = '';
        para.split(' ').forEach(word => {
            if ((currentLine + word).length < width) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        });
        if (currentLine) lines.push(currentLine);
    });
    return lines;
}

// Support both system-wide and user-specific Applications folders
const possibleAppPaths = [
    '/Applications/Antigravity.app',
    path.join(process.env.HOME || '', 'Applications/Antigravity.app')
];

let appPath = possibleAppPaths.find(p => fs.existsSync(p));

console.log(`\n${colors.cyan}══════════════════════════════════════════════════════════${colors.reset}`);
console.log(`${colors.cyan}         Antigravity Auto Locale & Region Patcher         ${colors.reset}`);
console.log(`${colors.cyan}══════════════════════════════════════════════════════════${colors.reset}\n`);

if (!appPath) {
    printErrorBox(
        'Antigravity App Not Found',
        'Google Antigravity is not installed in standard locations on this system.',
        'Checked folders:\n- /Applications/Antigravity.app\n- ~/Applications/Antigravity.app\n\nPlease make sure the application is installed.'
    );
    process.exit(1);
}

log.info(`Found Antigravity at: ${appPath}`);
const resourcesPath = path.join(appPath, 'Contents/Resources');
const asarPath = path.join(resourcesPath, 'app.asar');
const backupPath = path.join(resourcesPath, 'app.asar.bak');
const tempDir = path.join(__dirname, 'antigravity_temp_extracted');

// 1. Back up original asar
if (!fs.existsSync(backupPath)) {
    log.info('Creating backup of app.asar...');
    try {
        fs.copyFileSync(asarPath, backupPath);
        log.success('Backup created successfully.');
    } catch (err) {
        printErrorBox(
            'Backup Creation Failed',
            'Could not create a backup copy of app.asar.',
            err.message
        );
        process.exit(1);
    }
} else {
    log.info('Backup already exists.');
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
log.info('Extracting app.asar...');
try {
    extractAsar(asarPath, tempDir);
    log.success('Extraction complete.');
} catch (err) {
    printErrorBox(
        'ASAR Extraction Failed',
        'Could not programmatically unpack app.asar.',
        err.message
    );
    process.exit(1);
}

// 4. Modify preload.js
const preloadPath = path.join(tempDir, 'dist/preload.js');
if (fs.existsSync(preloadPath)) {
    log.info('Patching preload.js...');
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
        log.success('preload.js patched successfully.');
    } else {
        log.info('preload.js is already patched.');
    }
} else {
    printErrorBox(
        'Preload Script Not Found',
        'Could not locate dist/preload.js within the unpacked application archive.',
        'This version of Antigravity might have a different file structure.'
    );
    process.exit(1);
}

// 5. Modify languageServer.js
const lsPath = path.join(tempDir, 'dist/languageServer.js');
if (fs.existsSync(lsPath)) {
    log.info('Patching languageServer.js...');
    let content = fs.readFileSync(lsPath, 'utf8');
    
    const target = `const env = { ...process.env, ...(0, shell_env_1.shellEnvSync)() };`;
    const replacement = `const env = { ...process.env, ...(0, shell_env_1.shellEnvSync)(), TZ: 'America/New_York', LANG: 'en_US.UTF-8', LC_ALL: 'en_US.UTF-8' };`;
    
    if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(lsPath, content, 'utf8');
        log.success('languageServer.js patched successfully.');
    } else if (content.includes('TZ: \'America/New_York\'')) {
        log.info('languageServer.js is already patched.');
    } else {
        printErrorBox(
            'Language Server Patch Failed',
            'Could not find target environment creation line in languageServer.js.',
            'This version of Antigravity might be different or already altered.'
        );
        process.exit(1);
    }
} else {
    printErrorBox(
        'Language Server Script Not Found',
        'Could not locate dist/languageServer.js within the unpacked application archive.',
        'This version of Antigravity might have a different file structure.'
    );
    process.exit(1);
}

// 6. Repack asar
log.info('Packing app.asar back...');
try {
    packAsar(tempDir, asarPath);
    log.success('Successfully repacked app.asar.');
} catch (err) {
    printErrorBox(
        'ASAR Packing Failed',
        'Could not pack the modified directory back to app.asar.',
        err.message
    );
    process.exit(1);
}

// 7. Cleanup temp dir
log.info('Cleaning up temporary files...');
fs.rmSync(tempDir, { recursive: true, force: true });

console.log(`\n${colors.green}══════════════════════════════════════════════════════════${colors.reset}`);
console.log(`${colors.green}           ✨ Patch Completed Successfully! ✨           ${colors.reset}`);
console.log(`${colors.green}══════════════════════════════════════════════════════════${colors.reset}\n`);
log.info('Please restart Google Antigravity to apply the changes.');
