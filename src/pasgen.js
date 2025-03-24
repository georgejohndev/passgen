async function derivePassword(text = "", salt = "") {
    const encoder = new TextEncoder();
  
    // Convert text and salt to ArrayBuffer
    const textBuffer = encoder.encode(text);
    const saltBuffer = encoder.encode(salt);
  
    // Import text as a raw key for PBKDF2
    const keyMaterial = await crypto.subtle.importKey(
        'raw', textBuffer, { name: 'PBKDF2' }, false, ['deriveBits']
    );

    // Use PBKDF2 with SHA-256 to derive a strong password
    const keyBits = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: saltBuffer,
            iterations: 100000, // Adjust as needed for security vs. performance
            hash: 'SHA-256',
        },
        keyMaterial,
        256 // 256 bits = 32 bytes
    );

    // Convert derived bits to Base64
    return btoa(String.fromCharCode(...new Uint8Array(keyBits)));
}

// Example usage
derivePassword("mypassword", "mysalt").then(console.log);
