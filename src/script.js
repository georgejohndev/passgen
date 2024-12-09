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
            
            // Show visual feedback as a tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Copied!';
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = '#4CAF50';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.top = `${this.offsetTop - 30}px`; // Position above the input
            tooltip.style.left = `${this.offsetLeft}px`;
            document.body.appendChild(tooltip);

            // Remove the tooltip after 1.5 seconds
            setTimeout(() => {
                tooltip.remove();
            }, 1500);
        } catch (err) {
            console.error('Failed to copy text: ', err);

            // Show error tooltip
            const errorTooltip = document.createElement('div');
            errorTooltip.textContent = 'Failed to copy';
            errorTooltip.style.position = 'absolute';
            errorTooltip.style.backgroundColor = '#F44336';
            errorTooltip.style.color = '#fff';
            errorTooltip.style.padding = '5px 10px';
            errorTooltip.style.borderRadius = '4px';
            errorTooltip.style.top = `${this.offsetTop - 30}px`; // Position above the input
            errorTooltip.style.left = `${this.offsetLeft}px`;
            document.body.appendChild(errorTooltip);

            // Remove error tooltip after 1.5 seconds
            setTimeout(() => {
                errorTooltip.remove();
            }, 1500);
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

