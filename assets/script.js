// Make sure the HTML is ready before processing 
$(document).ready(function() {
    // Global Variables
    var JSONhighScores = JSON.parse(localStorage.getItem('highScoresStored'));
    var storage, highScores;
    
    // if local storage doesn't exist...
    if (JSONhighScores === null) {
        // then set highScores.player_scores is an empty array
        highScores = {
            player_scores: []
        }
    } else {
        // else, set the highScores.player_scores equal to what was set in localStorage
        highScores = {
            player_scores: JSONhighScores
        }    
    }
    
    // Global object that stores my list of questions within an array, as well as 
    storage = {
        questions: [
            {question: `What is the name of Mario's Brother? `, answer_0: `Antonio`, answer_1: `Frankie`, answer_2: `Geo`, answer_3: `Luigi`, correct_answer: 'answer_3'},
            {question: `What is the square root of 144? `, answer_0: `11`, answer_1: `14`, answer_2: `12`, answer_3: `4`, correct_answer: 'answer_2'},
            {question: `Sheldon Cooper is a character in which TV show? `, answer_0: `Futurama`, answer_1: `Big Ban Theory`, answer_2: `Friends`, answer_3: `Simpsons`, correct_answer: 'answer_1'},
            {question: `What MLB team has won the most world series? `, answer_0: `Dodgers`, answer_1: `Yankees`, answer_2: `Cardinals`, answer_3: `Giants`, correct_answer: 'answer_1'},
            {question: `Who wrote Moby Dick?`, answer_0: `Herman Melville`, answer_1: `Jane Eyre`, answer_2: `Mark Twain`, answer_3: `Charles Dickens`, correct_answer: 'answer_0'},
            {question: `How many rings are on the Olympic flag?`, answer_0: `None`, answer_1: `4`, answer_2: `5`, answer_3: `7`, correct_answer: 'answer_2'},
            {question: `How did Spider-Man get his powers?`, answer_0: `Military experiment gone awry`, answer_1: `Born with them`, answer_2: `Woke up with them after a strange dream`, answer_3: `Bitten by a radioactive spider`, correct_answer: 'answer_3'},
            {question: `What are the tallest trees on Earth?`, answer_0: `Coast Redwood`, answer_1: `Coast Douglas Fir`, answer_2: `Giant Sequoia`, answer_3: `Sitka Spruce`, correct_answer: 'answer_0'},
            {question: `Which war caused the greatest loss of life for Americans?`, answer_0: `WW1`, answer_1: `WW2`, answer_2: `Vietnam`, answer_3: `The American Civil War`, correct_answer: 'answer_3'},
            {question: `Which country employed the first police woman?`, answer_0: `England`, answer_1: `USA`, answer_2: `France`, answer_3: `Australia`, correct_answer: 'answer_1'},
            {question: `What is the world's most venomous fish?`, answer_0: `Scorpion fish`, answer_1: `Lion fish`, answer_2: `Stonefish`, answer_3: `Toadfish`, correct_answer: 'answer_2'},
            {question: `When born, a Dalmatian puppy is always...?`, answer_0: `Black`, answer_1: `Black with white spots`, answer_2: `White`, answer_3: `White with black spots`, correct_answer: 'answer_2'},
            {question: `Who is the only US President to resign?`, answer_0: `John Adams`, answer_1: `Ulysses S Grant`, answer_2: `Richard Nixon`, answer_3: `Herbert Hoover`, correct_answer: 'answer_2'},
            {question: `2,3,5,7,11 are the first four what?`, answer_0: `Odd numbers`, answer_1: `Integers`, answer_2: `Composite Numbers`, answer_3: `Prime Numbers`, correct_answer: 'answer_3'},
            {question: `What is the loudest animal on earth?`, answer_0: `African elephant`, answer_1: `Sperm whale`, answer_2: `Blue whale`, answer_3: `Indian elephant`, correct_answer: 'answer_2'},
            {question: `How many sides does a rhombus have?`, answer_0: `4`, answer_1: `6`, answer_2: `8`, answer_3: `10`, correct_answer: 'answer_0'},
            {question: `What is the main language spoken in Venezuela?`, answer_0: `Spanish`, answer_1: `Portuguese`, answer_2: `French`, answer_3: `Italian`, correct_answer: 'answer_0'},
        ],
    
        randomCheckArray: [], // This array will store the random numbers that are generated for the index of storage.questions during each game session to ensure we don't ask the same question twice
        curQuestion: true, // Whatever the current question is, we'll use this variable to store it's object for reference
        gameTimer: 60, // Game timer is set to 60 seconds
        score: 0, // Score starts at zero each time the pager is loaded
        answersCorrect: 0, // tracks answers correct
        answersIncorrect: 0, // tracks incorrect answers
        interval: true, //Creating this variable here to reference for our timer intervals
    }  
    
    
    // Function constructor to record player scores
    function PlayerScore(initials, score) {
        this.initials = initials;
        this.score = score;
    };

    // Check to see which page we're operating on.  If it's the index.html page, then execute the following code.
    if ($('body').data('title') === 'quiz-page') {
        // Functions

        // This function start's the game timer
        function startGameTimer() {
            storage.interval = setInterval(function() {
                // Change the color and font-size of the timer
                $('#timer-display').css({'color': 'inherit', 'font-size': '18px'});

                // Reduce the timer by 1 second
                storage.gameTimer--;

                // Change the timer display
                $('#timer-display').html(storage.gameTimer);
    
                // If the timer is 10 seconds or less...
                if (storage.gameTimer <= 10 ) {
                    // Set the font color to red and increase font size
                    $('#timer-display').css({'color': 'red', 'font-size': '30px'});
                }
                
                // If the timer reaches 0 or less...
                if (storage.gameTimer <= 0) {
                    // Change the heading on the game-over section to say Time's Up
                    $('#game-over-heading').html(`Time's Up!`);

                    // Display the game over screen
                    displayGameOver();
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
    
            questionBox.innerHTML = (`<h2 class="question-title">${nextQuestion.question}</h2><div id="answer-list"><button class="ans-btn btn" id="answer_0" value="1">1.)  ${nextQuestion.answer_0}</button><button class="ans-btn btn" id="answer_1">2.)  ${nextQuestion.answer_1}</button><button class="ans-btn btn" id="answer_2">3.)  ${nextQuestion.answer_2}</button><button class="ans-btn btn" id="answer_3">4.)  ${nextQuestion.answer_3}</button></div>`);
        };
    
        // Stop game and submit screen function
        function displayGameOver() {
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
            
            // Render the next question
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
            // set variables, make responseTimer only 1 second;
            var responseTimerInterval, responseTimer = 1;

            // If the result is correct...
            if (result==="Correct") {
                // change html to show correct on the UI
                $('#answer-response-box').html('<hr><p>Correct!<p>');

                // set a one second interval
                responseTimerInterval = setInterval(function(){
                    
                    // subtract from 1 the timer
                    responseTimer--;

                    // when the timer reaches 0...
                    if (responseTimer === 0) {
                        // change the html to be blank
                        $('#answer-response-box').html('');
                        // clear the interval
                        clearInterval(responseTimerInterval);
                    }
                }, 1000);

            } else {
                // change html to show incorrect on the UI
                $('#answer-response-box').append('<hr><p>Incorrect!<p>');

                // set a one second interval
                responseTimerInterval = setInterval(function(){

                    // subtract timer by one second
                    responseTimer--;

                    // when the timer reaches 0...
                    if (responseTimer === 0) {
                        // change the html to be blank
                        $('#answer-response-box').html('');
                        // clear the interval
                        clearInterval(responseTimerInterval);
                    }
                }, 1000);
                
                // stop current game timer
                clearInterval(storage.interval)

                // subtract gameTimer by 10 sec
                storage.gameTimer -= 10;
                
                // if the gameTimer is 0 or less...
                if (storage.gameTimer <= 0) {
                    // display the game over screen
                    displayGameOver();

                    // Display on UI that the time is up
                    $('#game-over-heading').html(`Time's Up!`); 

                // else if timer is greater than 0...                      
                } else {
                    // immediately display the new time
                    $('#timer-display').html(storage.gameTimer);
    
                    // start the timer again with the new time
                    startGameTimer();
                };
            };
        };

        // function to record a player's score
        function recordScore() {
            // get the user's input
            var inputInitials = $('#initials-input').val();
            
            // create a new PlayerScore object
            var player = new PlayerScore(inputInitials, storage.score);

            // push the new player into the highScores.player_scores array
            highScores.player_scores.push(player);

            // set the localStorage key to our updated highScores.player_scores array
            localStorage.setItem('highScoresStored', JSON.stringify(highScores.player_scores));
            
        };
    
    
        // EVENT LISTENERS
        //=========================================================
    
        // Start Button Event Listener
        $('#start-button').on('click', startGame);

        // Retry Button Event Listener
        $('#retry-button').on('click', function() {
            // reload the page to restart the game and reset our storage values
            location.reload(true);
        });

        // Submit Score Event Listener
        $('#submit-score-button').on('click', function() {
            // call recordScore function
            recordScore();

            // open the high scores page
            window.location.replace("./scores.html");
        });
        
    
    
        // Question answer buttons Event Listener.  Cannot use jQuery here because we are dynamically generating this HTML in the question-div-box
        document.getElementById('question-div-box').addEventListener('click', function(event) {
    
            // make sure the button is clicked
            var buttonClicked = event.target;
            
            // if the click was on a button element within the question-div-box
            if (buttonClicked.matches("button")) {
    
                // Check to see if the answer was right or wrong
                if (storage.curQuestion.correct_answer === buttonClicked.id) {
                    // display UI response for correct
                    addResponse("Correct");

                    // add 1 to score
                    storage.score += 1;

                    // add 1 to answersCorrect
                    storage.answersCorrect += 1;
                } else {
                    // display UI response for incorrect
                    addResponse("Incorrect");

                    // add 1 to answersIncorrect
                    storage.answersIncorrect += 1;
                };

                // if all questions have been answered...
                if (storage.randomCheckArray.length === storage.questions.length){
                    // display Game Over screen
                    displayGameOver();

                    // change game over heading to 'All questions answered'
                    $('#game-over-heading').html('All Questions Answered!');

                    // return to prevent rendering next question since we're all done
                    return;
                }
        
                // If we're not all done with the questions, then generate the next random question by picking a random number
                renderQuestion();
            };
    
        });

    };

    // if I'm on my scores.html page, then execute the following code
    if ($('body').data('title') === 'high-scores-page') {
        // get and sort high scores array, using the 'compare' function to sort
        var sortedHighScores = highScores.player_scores.sort(compare);
        
        // function used to sort from highest to lowest
        function compare(a,b) {
            // define the current and next elements score value
            var scoreA = a.score;
            var scoreB = b.score;

            // the base sort case is 0, meaning the elements have the same value
            let comparison = 0;

            // if the current element is less than the next
            if (scoreA < scoreB) {
                // sort case is 1
                comparison = 1;
            // if the next element is less than the current     
            } else if (scoreB < scoreA) {
                // sort case is -1
                comparison = -1;
            };

            // return the sort case
            return comparison
        };

        // function to render high scores on the board
        function renderHighScores() {
            // go through each element in our sortedHighScores array and...
            sortedHighScores.forEach(function(cur, i) {
                // append the html with the player's information to the table
                $('table').append(`<tr><td>${i + 1}</td><td>${cur.initials.toUpperCase()}</td><td>${cur.score}</td></tr>`);
            }); 
        };

        // clear local storage function
        function resetHighScores() {
            // clear local storage
            localStorage.clear();
            // reload the page
            location.reload(true);
        };

        // add event listener to Reset High Score button
        $('#clear-scores-btn').on('click', resetHighScores);

        // call our renderHighScores function when the document is ready
        renderHighScores();
    };
});








