// Get elements
const generatedPasswordInput = document.getElementById('generatedPassword');
const passwordInput = document.getElementById('text');
const saltInput = document.getElementById('salt');
const customTooltip = document.getElementById('customTooltip');
const copiedTooltip = document.getElementById('copiedTooltip');

// Function to show tooltip with success or error state
function showTooltip(message, isSuccess = true) {
    copiedTooltip.textContent = message;
    
    // Toggle classes for styling
    copiedTooltip.classList.remove("success", "error");
    copiedTooltip.classList.add(isSuccess ? "success" : "error", "show");
    customTooltip.classList.remove("show");

    setTimeout(() => {
        copiedTooltip.classList.remove("show");
        customTooltip.classList.add("show");
    }, 1500);
}

// Click event to copy password to clipboard
generatedPasswordInput.addEventListener('click', async function () {
    if (this.value) {
        try {
            await navigator.clipboard.writeText(this.value);
            showTooltip('Copied!', true);
        } catch (err) {
            console.error('Failed to copy text:', err);
            showTooltip('Failed to copy', false);
        }
    }
});

// Function to update the derived password
async function updatePassword() {
    if (passwordInput.value || saltInput.value) {
        const derivedPassword = await derivePassword(passwordInput.value, saltInput.value);
        generatedPasswordInput.value = derivedPassword;
    }
}

// Listen for changes on password or salt inputs
passwordInput.addEventListener('input', updatePassword);
saltInput.addEventListener('input', updatePassword);
