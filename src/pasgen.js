// Function to securely derive a password from text and salt.
async function derivePassword(text="", salt="") {
    const encoder = new TextEncoder();
  
    // Convert text and salt to ArrayBuffer
    const textBuffer = encoder.encode(text);
    const saltBuffer = encoder.encode(salt);
  
    // Use PBKDF2 to derive a password using SHA-256 as the hash function
    const iterations = 100000; // Number of iterations (higher = more secure but slower)
    const keyLength = 32; // Length of the derived key (256-bit)
  
    const derivedKey = await crypto.subtle.importKey(
      'raw',
      textBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
  
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: saltBuffer,
        iterations: iterations,
        hash: 'SHA-256',
      },
      derivedKey,
      keyLength * 8 // Return 256-bit key
    );
  
    // Convert the derived key to a Base64 encoded string for easier handling
    const base64Password = bufferToBase64(derivedBits);
  
    return base64Password;
  }
  
  // Function to convert ArrayBuffer to Base64
  function bufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
  
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
  
    return window.btoa(binary); // Base64 encoding
  }
  
  // Example usage
  // const timestampInSeconds = Math.floor(Date.now() / 1000);
  // console.log(timestampInSeconds);
  