//===================================

//function number 1 

//===================================

function feedbackPage() {
    // Check if the feedback textarea is empty
    var feedbackTextarea = document.querySelector('.textarea');
    var feedbackText = feedbackTextarea.value.trim();

    if (feedbackText === "") {
        // If empty, inform the user and prevent form submission
        alert("Please provide your feedback before submitting.");
        return false; // This prevents the form from being submitted
    }

    // If not empty, continue with your existing logic
    hitCounting();
}



//===================================

//function number 2 to limit the number of submitted feedback from the users

//===================================

function hitCounting() {

    //checking if the submitted button of feedback was clicked before
    if (localStorage.pagecount) {

        localStorage.pagecount = Number(localStorage.pagecount) + 1;

    } else {

        localStorage.pagecount = 1;

    }

    //if it was clicked then run the if statements accordingly
    if (localStorage.pagecount > 1) {

        alert("You already have submitted your feedback!\nWe will read your feedback carefully!\nThank you.\nYour feedback helps us improve!");

    } else {

        //inform the user for their feedback feedback
        alert("Thank you for providing your feedback.\nYour feedback helps us improve!");

    }

} //end hitCount

//===================================

//function number 3 scrollBox for feedback page 

//===================================

//declaring variables and assigning values to them
i = 0; // integer type
direction = 1;
isTyping = true; //boolean type
function scrollBoxForFeedbackPage() {

    var message = "lease Send Us Your Feedback";
    if (isTyping) {
        //when the condition is true

        document.getElementById("DynamicTextForFeedbackPage").innerHTML = message.substring(0, i) + "_";

    } else {

        //otherwise
        document.getElementById("DynamicTextForFeedbackPage").innerHTML = message.substring(0, i);

    }

    if (i >= message.length) {

        setTimeout("scrollBoxForFeedbackPage()", 2000); //pause time in msI 2 seconds
        return (document.getElementById("DynamicTextForFeedbackPage").innerHTML = "lease Send Us Your Feedback");

    }

    i += direction; //increment

    isTyping = !isTyping; //here to toggle
    setTimeout("scrollBoxForFeedbackPage()", 200);

}

//end function scrollBox for feedback page 

//===================================

//function number 4 darkMode for color blind needs 

//===================================

function darkMode() {
    const toggleBtn = document.getElementById("toggleBtn");
    const body = document.body;

    // Check if dark mode is enabled in local storage
    const isDarkMode = localStorage.getItem("darkMode") === "true";

    // Set initial mode based on local storage
    if (isDarkMode) {
        body.classList.add("dark-mode");
    }

    // Toggle dark mode class on body and save mode to local storage
    toggleBtn.addEventListener("click", function() {
        body.classList.toggle("dark-mode");
        const isDarkModeEnabled = body.classList.contains("dark-mode");
        // Save mode to local storage
        localStorage.setItem("darkMode", isDarkModeEnabled);
    });
}

//end color blind function here 

//===================================

//function number 5 checking internet status

//===================================

function checkingInternetStatus () {
    //if the user is not connected to the internet
    if (navigator.onLine == false) {

        alert('You are offline!');

    } else if (navigator.onLine == true) {//else if

        alert('You are online!');

    } else {//otherwise in all conditions
        alert ('Cannot detect if you are online or offline!');
    }

}

//end checking internet status function here