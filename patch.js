const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const appPath = '/Applications/Antigravity.app';
const resourcesPath = path.join(appPath, 'Contents/Resources');
const asarPath = path.join(resourcesPath, 'app.asar');
const backupPath = path.join(resourcesPath, 'app.asar.bak');
const tempDir = path.join(__dirname, 'antigravity_temp_extracted');

console.log('--- Antigravity Auto Patch Script ---');

if (!fs.existsSync(appPath)) {
    console.error(`Error: Antigravity is not installed at ${appPath}`);
    process.exit(1);
}

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

// 3. Extract asar
console.log('Extracting app.asar...');
try {
    execSync(`npx -y asar extract "${asarPath}" "${tempDir}"`, { stdio: 'inherit' });
} catch (err) {
    console.error('Failed to extract app.asar. Make sure npx/node is installed.', err);
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
    execSync(`npx -y asar pack "${tempDir}" "${asarPath}"`, { stdio: 'inherit' });
    console.log('Successfully repacked app.asar.');
} catch (err) {
    console.error('Failed to pack app.asar.', err);
    process.exit(1);
}

// 7. Cleanup temp dir
console.log('Cleaning up temporary files...');
fs.rmSync(tempDir, { recursive: true, force: true });

console.log('\n--- Patch Completed Successfully! ---');
console.log('Please restart Antigravity.');
