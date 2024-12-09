// Get the generated password input element
const generatedPasswordInput = document.getElementById('generatedPassword');
const passwordInput = document.getElementById('text');
const saltInput = document.getElementById('salt');

// Add click event listener for copying
generatedPasswordInput.addEventListener('click', async function() {
    // Only proceed if there's text to copy
    if (this.value) {
        try {
            await navigator.clipboard.writeText(this.value);
            
            // Visual feedback - temporarily change the title
            const originalTitle = this.title;
            this.title = 'Copied!';
            setTimeout(() => {
                this.title = originalTitle;
            }, 1500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            this.title = 'Failed to copy';
        }
    }
});

passwordInput.addEventListener('input', async function() {
    const derivedPassword = await derivePassword(this.value, saltInput.value);
    generatedPasswordInput.value = derivedPassword;
});

saltInput.addEventListener('input', async function() {
    const derivedPassword = await derivePassword(passwordInput.value, this.value);
    generatedPasswordInput.value = derivedPassword;
});

