//===================================

//function number 1 scrollBox for Home page 

//===================================

//declaring variables and assigning values to them
i = 0; // integer type
direction = 1;
isTyping = true; //boolean type
function scrollBoxForHomePage() {

    var message = "rices and realtime data in your hands";
    if (isTyping) {
        //when the condition is true

        document.getElementById("scrollBoxForHomePage").innerHTML = message.substring(0, i) + "_";

    } else {

        //otherwise
        document.getElementById("scrollBoxForHomePage").innerHTML = message.substring(0, i);

    }

    if (i >= message.length) {

        setTimeout("scrollBoxForHomePage()", 2000); //pause time in msI 2 seconds
        return (document.getElementById("scrollBoxForHomePage").innerHTML = "rices and realtime data in your hands");

    }

    i += direction; //increment

    isTyping = !isTyping; //here to toggle
    setTimeout("scrollBoxForHomePage()", 200);

}
//===================================

//function number 2 smooth scrolling

//===================================

function scrollToTop() {

    // Scroll smoothly to the top of the page
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    
}

//===================================

// Function number 3 to apply dark mode styles

//===================================

function applyDarkMode() {

    var body = document.body;
    body.classList.add("dark-mode");
    document.getElementById("darkModeCheckbox").checked = true;

}

//===================================

// Function number 4 to apply light mode styles

//===================================

function applyLightMode() {

    var body = document.body;
    body.classList.remove("dark-mode");
    document.getElementById("darkModeCheckbox").checked = false;

}

//===================================

// Function number 5 to toggle dark mode when the checkbox is clicked

//===================================

function toggleDarkMode() {

    var darkModeCheckbox = document.getElementById("darkModeCheckbox");

    //just calling the methods that been created if the conditions are met
    if (darkModeCheckbox.checked) {
        applyDarkMode();
    } else {
        applyLightMode();
    }

}

//===================================

// function number 6 checking the internet connection 

//===================================

function checkingInternetStatus () {

    if (navigator.onLine == false) {

        alert('Your internet is unstable this might result to fetching data problems. \nPlease make sure you stable have internet connection.');

    }

}

//===================================

// function number 7 to show the fear index and hide the greed index 

//===================================
function showFearIndex() {
    document.getElementById('fearIndex').style.display = 'inline';
    document.getElementById('greedIndex').style.display = 'none';
    document.getElementById('fearBTN').innerHTML = '';
    document.getElementById('fearBTN').innerHTML = 'Fear Index Shown!';
    document.getElementById('greedBTN').innerHTML = '';
    document.getElementById('greedBTN').innerHTML = 'Show Green Index?';
}

//===================================

// function number 8 to show the greed index and hide the fear index

//===================================

function showGreedIndex() {
    document.getElementById('fearIndex').style.display = 'none';
    document.getElementById('greedIndex').style.display = 'inline';
    document.getElementById('fearBTN').innerHTML = '';
    document.getElementById('fearBTN').innerHTML = 'Show Fear Index?';
    document.getElementById('greedBTN').innerHTML = '';
    document.getElementById('greedBTN').innerHTML = 'Greed Index Shown!';
}