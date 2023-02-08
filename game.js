
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

// Variable to store levels (begining with 0).
var level = 0;

// Keyboard key detection. after first time call nextSequence() function.
$(document).keypress(function () {
    if (!started) {

        // h1 says "Press A Key to Start", when the game has started changes to "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    // Call checkAnswer() and passess user answer in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
});


// Pattern checker function
function checkAnswer(currentLevel) {

    // Check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        // If the user got the most recent answer right, then check that they have finished their sequence.
        if (userClickedPattern.length === gamePattern.length) {

            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        console.log("wrong");

        playSound("wrong");

        // Apply "game-over" class for 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }

}

function nextSequence() {

    // Once nextSequence() is triggered the userClickedPattern reset to an empty array ready for the next level.
    userClickedPattern = [];

    // Increase the level by 1 every time nextSequence() is called.
    level++;

    // Update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    // Remove the pressed class after a 100 milliseconds.
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Reset the values of level, gamePattern and started variables
function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
}
