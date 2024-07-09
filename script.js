function openTerminal() {
    document.getElementById('terminal').style.display = 'block';
}

const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');

terminalInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = this.value;
        terminalOutput.innerHTML += `<div>> ${command}</div>`;
        
        // Process command
        if (command.toLowerCase() === 'help') {
            terminalOutput.innerHTML += '<div>Available commands: manifesto, contact, resources, exit</div>';
        } else if (command.toLowerCase() === 'manifesto') {
            terminalOutput.innerHTML += '<div>Accessing manifesto... Please wait for secure download.</div>';
        } else if (command.toLowerCase() === 'contact') {
            terminalOutput.innerHTML += '<div>For security reasons, contact information is not provided here. Attend local meetings for further instructions.</div>';
        } else if (command.toLowerCase() === 'resources') {
            terminalOutput.innerHTML += '<div>Accessing secure resource library... Authentication required.</div>';
        } else if (command.toLowerCase() === 'exit') {
            document.getElementById('terminal').style.display = 'none';
        } else {
            terminalOutput.innerHTML += '<div>Command not recognized. Type "help" for available commands.</div>';
        }

        this.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

function changeLanguage(lang) {
    console.log(`Language changed to ${lang}`);
    // Implement actual language switching logic here
}
