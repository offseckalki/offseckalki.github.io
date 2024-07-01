function handleKeyPress(event) {
    if (event.key === "Enter") {
        const input = document.getElementById('terminalInput').value;
        if (input.toLowerCase() === "shell") {
            window.location.href = "https://offseckalki.github.io/shell";
        } else {
            alert("Invalid command");
        }
    }
}
