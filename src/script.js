// Get elements
const generatedPasswordInput = document.getElementById('generatedPassword');
const passwordInput = document.getElementById('text');
const saltInput = document.getElementById('salt');
const customTooltip = document.getElementById('customTooltip');
const copiedTooltip = document.getElementById('copiedTooltip');

// Function to update tooltip appearance
function updateTooltip(message, isSuccess = true) {
    copiedTooltip.textContent = message;
    copiedTooltip.style.backgroundColor = isSuccess ? '#4CAF50' : '#F44336';
    copiedTooltip.style.color = '#fff';
    copiedTooltip.style.padding = '5px 10px';
    copiedTooltip.style.borderRadius = '4px';
    copiedTooltip.style.display = 'block';
    customTooltip.style.display = 'none';

    setTimeout(() => {
        copiedTooltip.style.display = 'none';
        customTooltip.style.display = 'block';
    }, 1500);
}

// Click event to copy password
generatedPasswordInput.addEventListener('click', async function () {
    if (!this.value) return;

    try {
        await navigator.clipboard.writeText(this.value);
        updateTooltip('Copied!', true);
    } catch (err) {
        console.error('Failed to copy text:', err);
        updateTooltip('Failed to copy', false);
    }
});

// Function to update the derived password
async function updatePassword() {
    if (!passwordInput.value) {
        generatedPasswordInput.value = ""; // Ensure it's empty when passwordInput is empty
        return;
    }
    
    const derivedPassword = await derivePassword(passwordInput.value, saltInput.value);
    generatedPasswordInput.value = derivedPassword;
}

// Listen for changes on password or salt inputs
passwordInput.addEventListener('input', updatePassword);
saltInput.addEventListener('input', updatePassword);
