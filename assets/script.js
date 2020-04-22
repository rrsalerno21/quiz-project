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
        {question: `Pickles!  Hi I'm a question 0!  This is the title of a question. `, answer_0: `I'm answer one!`, answer_1: `I'm answer two!`, answer_2: `I'm answer three!`, answer_3: `I'm answer four!`, correct_answer: 'answer_0'},
        {question: `Man I wish I could eat a sandwich right now.  Hi I'm a question 1!  This is the title of a question. `, answer_0: `I'm answer one!`, answer_1: `I'm answer two!`, answer_2: `I'm answer three!`, answer_3: `I'm answer four!`, correct_answer: 'answer_0'},
        {question: `Wow my imagination is subpar.  Hi I'm a question 2!  This is the title of a question. `, answer_0: `I'm answer one!`, answer_1: `I'm answer two!`, answer_2: `I'm answer three!`, answer_3: `I'm answer four!`, correct_answer: 'answer_0'}
    ],

    randomCheckArray: [],
    curQuestion: true, // Whatever the current question is, we'll use this variable to store it's object for reference
    gameTimer: 60,
    score: 0,
    answersCorrect: 0,
    answersIncorrect: 0,
    interval: true //Creating this variable here to reference for our timer intervals
}

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
                $('#game-over-heading').html(`Time's Up!`);
                displaySubmitScreen();
            }
        }, 1000);
    };

    // Render next question function
    function renderQuestion() {
        // Generate the next random question by picking a random number
        var ranNum = Math.floor(Math.random() * storage.questions.length);

        // Check to see if that random number has already been generated
        while (storage.randomCheckArray.includes(ranNum)) {
            ranNum = (ranNum + 1) % storage.questions.length;
        }
        
        // Push that random index number into our storage array
        storage.randomCheckArray.push(ranNum);

        // Set our next question
        var nextQuestion = storage.questions[ranNum];
        storage.curQuestion = nextQuestion;

        // Display the next random question
        var questionBox = document.getElementById('question-div-box');

        questionBox.innerHTML = (`<h2 class="question-title">${nextQuestion.question}</h2><div id="answer-list"><button class="ans-btn" id="answer_0" value="1">1.)  ${nextQuestion.answer_0}</button><button class="ans-btn" id="answer_1">2.)  ${nextQuestion.answer_1}</button><button class="ans-btn" id="answer_2">3.)  ${nextQuestion.answer_2}</button><button class="ans-btn" id="answer_3">4.)  ${nextQuestion.answer_3}</button></div>`);
    };

    // Stop game and submit screen function
    function displaySubmitScreen() {
        //stop the timer and hide the timer
        clearInterval(storage.interval);
        $('#timer-box').toggle('hide');

        //update final-score
        $('#final-score').html(`Your Final Score: ${storage.score}`);

        // display the submit score screen
        $('#time-up-box').toggle('hide');
        $('#question-div-box').toggle('hide');
    }

    // function to initiate the game
    function startGame() {
        // Hide the start screen
        $('#intro-div').toggle('hide');
        
        renderQuestion();

        // Start a 60 second timer
        startGameTimer();

        // Display timer
        $('#timer-box').toggle('hide');


        // Display the #question-div-box
        $('#question-div-box').toggle('hide');
    }

    // add answer response function
    function addResponse(result) {
        var responseTimerInterval, responseTimer = 1;
        if (result==="Correct") {
            // display UI response for correct for 3 seconds
            $('#answer-response-box').html('<hr><p>Correct!<p>');
            responseTimerInterval = setInterval(function(){
                responseTimer--;
                if (responseTimer === 0) {
                    $('#answer-response-box').html('');
                    clearInterval(responseTimerInterval);
                }
            }, 1000)
        } else {
            // display UI response for incorrect for 3 seconds
            console.log('wrong');
            $('#answer-response-box').append('<hr><p>Incorrect!<p>');
            responseTimerInterval = setInterval(function(){
                responseTimer--;
                if (responseTimer === 0) {
                    $('#answer-response-box').html('');
                    clearInterval(responseTimerInterval);
                }
            }, 1000);

            // stop current timer, subtract gameTimer by 10 sec and immediately display the new time
            clearInterval(storage.interval)
            storage.gameTimer -= 10;

            if (storage.gameTimer <= 0) {
                displaySubmitScreen();
                $('#game-over-heading').html(`Time's Up!`);
                return
            } else {
                $('#timer-display').html(storage.gameTimer);

                // start the timer again with the new time
                startGameTimer();
            }
        }
    }


    // EVENT LISTENERS
    //=========================================================

    // Start Button Event Listener
    $('#start-button').on('click', startGame);
    $('#retry-button').on('click', function() {
        console.log('please dont break me');
        location.reload(true);
    });
    



    // Question answer buttons Event Listener.  Cannot use jQuery here because we are dynamically generating this HTML
    document.getElementById('question-div-box').addEventListener('click', function(event) {

        // make sure the button is clicked
        var buttonClicked = event.target;
        
        if (buttonClicked.matches("button")) {

            // Check to see if the answer was right or wrong
            if (storage.curQuestion.correct_answer === buttonClicked.id) {
                // display UI response for correct for 3 seconds
                addResponse("Correct");
                storage.score += 1;
                storage.answersCorrect += 1;
            } else {
                // display UI response for incorrect for 3 seconds
                addResponse("Incorrect");
                storage.answersIncorrect += 1;
            }
        };

        // if all questions have been answered, display Submit Screen
        if (storage.randomCheckArray.length === storage.questions.length){
            displaySubmitScreen();
            $('#game-over-heading').html('All Questions Answered!');
            return;
        }

        // Generate the next random question by picking a random number
        renderQuestion();
    });

});



