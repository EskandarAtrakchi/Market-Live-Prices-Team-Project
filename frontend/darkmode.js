// darkmode.js

// Check if dark mode is enabled and apply the appropriate styles
var darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
if (darkModeEnabled) {
    applyDarkMode();
} else {
    applyLightMode();
}

// Add an event listener to the checkbox to call the toggleDarkMode function when it's clicked
document.getElementById("darkModeCheckbox").addEventListener("click", toggleDarkMode);

function applyDarkMode() {
    var body = document.body;
    body.classList.add("dark-mode");
    document.getElementById("darkModeCheckbox").checked = true;
    // Save dark mode preference to localStorage
    localStorage.setItem('darkModeEnabled', true);
}

function applyLightMode() {
    var body = document.body;
    body.classList.remove("dark-mode");
    document.getElementById("darkModeCheckbox").checked = false;
    // Save light mode preference to localStorage
    localStorage.setItem('darkModeEnabled', false);
}

function toggleDarkMode() {
    var darkModeCheckbox = document.getElementById("darkModeCheckbox");
    if (darkModeCheckbox.checked) {
        applyDarkMode();
    } else {
        applyLightMode();
    }
}
