// PSEUDO CODE

// I need a start button that initializes the game, which includes
    // A 60 second timer that exists in the upper right corner
        // We'll need a variable that can be referenced across scopes
    // Without changing the page, the first multiple choice question appears


// I need an array of multiple choice questions with at least 4 possible answers
    // Use objects to store 1.)questions, 2.)their answers in an array, and 3.) the correct answer's index in that array
    // Put all of those questions into an array and randomly select from that array

// When the start game button is clicked, I need a function to dynamically render the questions, their answers, and buttons that associate with the answer's array index
    // I need a delegated Event Listener over the buttons that when clicked
        // invokes a function that determines if it's a correct answer and displays the appropriate message at the bottom using a setInterval Timer
            // if it's correct, then displays a "Correct Answer!"
            // if it's incorrect, then displays "Wrong Answer" and subtracts x amount of time from the game timer
        // re-renders the page with the next question


// When the game timer ends or all of the questions have been answered
    // Then the final score is display dynamically
    // the user is prompeted to input their initials and hit submit

// When they submit their score, I need to take the user to a new page that contains a list of high scores, sorted from highest to lowest
    // The list needs to be stored locally
    // The list needs to be sorted from highest to lowest 
    // I need to have two buttons available beneath the list
        // Clear high scores => clears the local storage
        // Play Again => 
            // Takes the user back to the index page
            

    
