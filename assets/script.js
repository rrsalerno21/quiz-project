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
            

// Global Variables
var storage = {
    questions: [
        {question: `Hi I'm a question 0!  This is the title of a question. `, answer_0: `I'm answer one!`, answer_1: `I'm answer two!`, answer_2: `I'm answer three!`, answer_3: `I'm answer four!`, correct_answer: 'answer_0'},
        {question: `Hi I'm a question 1!  This is the title of a question. `, answer_0: `I'm answer one!`, answer_1: `I'm answer two!`, answer_2: `I'm answer three!`, answer_3: `I'm answer four!`, correct_answer: 'answer_1'},
        {question: `Hi I'm a question 2!  This is the title of a question. `, answer_0: `I'm answer one!`, answer_1: `I'm answer two!`, answer_2: `I'm answer three!`, answer_3: `I'm answer four!`, correct_answer: 'answer_2'}
    ],

    randomCheckArray: [],
    curQuestion: true, // Whatever the current question is, we'll use this variable to store it's object for reference
    gameTimer: 60,
    score: 0,
    answersCorrect: 0,
    answersIncorrect: 0,
    interval: true //Creating this variable here to reference for our timer intervals
}
    
var html = `<h2 class="question-title">This is the title of a question.  What is the correct answer to what I'm going to ask?</h2><div id="answer-list"><button id="answer_0">1.) I'm not really sure.</button><button id="answer_1">2.) I have absolutely no idea.</button><button id="answer_2">3.) I'm so sure that I know the answer</button><button id="answer_3">4.) I'm quiting your game already.</button></div><div id="answer-response-box" class="hide"><hr><p id="answer-response">Correct!</p></div>`;



$(document).ready(function() {
    // Functions
    function startGameTimer() {
        storage.interval = setInterval(function() {
            $('#timer-display').css({'color': 'inherit', 'font-size': '18px'});
            storage.gameTimer--;
            $('#timer-display').html(storage.gameTimer);


            if (storage.gameTimer <= 10 ) {

                $('#timer-display').css({'color': 'red', 'font-size': '30px'});
            }
            if (storage.gameTimer <= 0) {
                displaySubmitScreen();
            }
        }, 1000);
    };

    // Stop game and submit screen function
    function displaySubmitScreen() {
        //stop the timer and hide the timer
        clearInterval(storage.interval);
        $('#timer-box').toggle('hide');

        // display the submit score screen
        $('#time-up-box').toggle('hide');
        $('#question-div-box').toggle('hide');
    }

    // Start Button Event Listener
    $('#start-button').on('click', function() {
        // Hide the start screen
        $('#intro-div').toggle('hide');
        
        // Pick a random question to start with
        var ranNum = Math.floor(Math.random() * storage.questions.length)
        var startQuestion = storage.questions[ranNum];
        storage.curQuestion = startQuestion;

        // Store that random number in our randomCheckArray to make sure we don't duplicate questions later
        storage.randomCheckArray.push(ranNum);

        // Generate that question's HTML and append it into the #question-div-box 
        var questionHTML = $('#question-div-box').html(`<h2 class="question-title">${startQuestion.question}</h2><div id="answer-list"><button class="ans-btn" id="answer_0" value="1">1.)  ${startQuestion.answer_0}</button><button class="ans-btn" id="answer_1">2.)  ${startQuestion.answer_1}</button><button class="ans-btn" id="answer_2">3.)  ${startQuestion.answer_2}</button><button class="ans-btn" id="answer_3">4.)  ${startQuestion.answer_3}</button></div><div id="answer-response-box" class="hide"><hr><p id="answer-response">Correct!</p></div>`)

        // Start a 60 second timer
        startGameTimer();

        // Display timer
        $('#timer-box').toggle('hide');


        // Display the #question-div-box
        $('#question-div-box').toggle('hide');
    });



    // Question answer buttons Event Listener.  Cannot use jQuery here because we are dynamically generating this HTML
    document.getElementById('question-div-box').addEventListener('click', function(event) {

        
        // Check to see if the answer was right or wrong, display the response, and affect the timer if answered incorrectly.
        var buttonClicked = event.target;
        var responseTimerInterval, responseTimer = 2;
        if (buttonClicked.matches("button")) {
            console.log('You clicked me successfully!');
            if (storage.curQuestion.correct_answer === buttonClicked.id) {
                // display UI response for correct for 3 seconds
                $('#answer-response').html('Correct!');
                $('#answer-response-box').toggle('hide');
                responseTimerInterval = setInterval(function(){
                    responseTimer--;
                    if (responseTimer === 0) {
                        $('#answer-response-box').toggle('hide');
                        clearInterval(responseTimerInterval);
                    }
                }, 1000)
                
            } else {
                // display UI response for incorrect for 3 seconds
                $('#answer-response').html('Incorrect!');
                $('#answer-response-box').toggle('hide');
                responseTimerInterval = setInterval(function(){
                    responseTimer--;
                    if (responseTimer === 0) {
                        $('#answer-response-box').toggle('hide');
                        clearInterval(responseTimerInterval);
                    }
                }, 1000);
    
                // subtract gameTimer by 10 sec and immediately display the new time
                clearInterval(storage.interval)
                storage.gameTimer -= 10;
                $('#timer-display').html(storage.gameTimer);

                // start the timer again with the new time
                startGameTimer();
            };

            // Check to see if all questions have been asked
            if (storage.randomCheckArray.length === storage.questions.length) {
                displaySubmitScreen();
                return;
            }

            // Generate the next random question by picking a random number
            var ranNum = Math.floor(Math.random() * storage.questions.length);

            // Check to see if that random number has already been generated
            if (storage.randomCheckArray.includes(ranNum)) {
                ranNum = Math.floor(((Math.random() * storage.questions.length) + 1) % (storage.questions.length - 1))
            }
            var nextQuestion = storage.questions[ranNum]
    
            // Display the next random question
        }
    });

});



