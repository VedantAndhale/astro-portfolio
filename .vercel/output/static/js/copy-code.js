document.addEventListener('DOMContentLoaded', () => {
    const preBlocks = document.querySelectorAll('pre');

    preBlocks.forEach((pre) => {
        // Ensure the pre block is intended to have a copy button
        // Example: Check if it contains a code element or has a specific class
        const code = pre.querySelector('code');
        if (!code || pre.closest('.no-copy')) { // Added check for .no-copy class
            return;
        }

        const button = document.createElement('button');
        button.textContent = 'Copy';
        button.className = 'copy-code-button'; // Use class for styling
        button.setAttribute('aria-label', 'Copy code to clipboard'); // Accessibility
        button.type = 'button'; // Explicitly set button type

        // Minimal inline styles for positioning
        button.style.position = 'absolute';
        button.style.top = '0.5rem';
        button.style.right = '0.5rem';
        // Let CSS handle the rest

        pre.style.position = 'relative'; // Ensure pre is positioned

        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(code.textContent || '');
                button.textContent = 'Copied!';
                button.classList.add('copied'); // Add class for feedback
                code.style.color = '#16a34a'; // Make code text green on copy
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.classList.remove('copied'); // Remove feedback class
                    code.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                button.textContent = 'Error';
                button.classList.add('error'); // Add class for error feedback
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.classList.remove('error'); // Remove error class
                }, 2000);
            }
        });

        pre.appendChild(button);
    });
});
