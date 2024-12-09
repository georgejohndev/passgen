// Function to securely derive a password from text and salt
const crypto = require('crypto');
const readline = require('readline');

async function derivePassword(text, salt) {
    // Use Node.js crypto module instead of Web Crypto API
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(text, salt, 100000, 32, 'sha256', (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('base64'));
        });
    });
}

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt for input
async function getInput() {
    const text = await new Promise(resolve => {
        rl.question('Enter text: ', resolve);
    });
    
    const salt = await new Promise(resolve => {
        rl.question('Enter salt: ', resolve);
    });

    const derivedPassword = await derivePassword(text, salt);
    console.log("Derived Password (Base64):", derivedPassword);
    
    rl.close();
}

// Run the program
getInput();
