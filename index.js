var userClickedPattern = [];

var level = 0;

var started = false; 

var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

$(document).keydown(function (){
    if(!started){
        $("#level-title").html("Level " + level);
        started = true;
        nextSequence();
    }
});

var cnt = 0;

$(".btn").click(function(event) {

    var colorClicked = $(this).attr("id");
    userClickedPattern.push(colorClicked);

    makeSound(colorClicked);
    animatePress(colorClicked);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);
    level = level + 1;
    $("h1").html("level " + level);
}



function makeSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed");
    },100);
    
}



function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(gamePattern.length == userClickedPattern.length){
            userClickedPattern = [];
            setTimeout(function (){
                nextSequence();
            },1000);
        }
    }
    else{
        gameOver();
    }
}

function gameOver(){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    },200);
    startOver();

}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
    $("h1").html("Press any key to restart!");
}