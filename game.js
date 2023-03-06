var buttonColors = ["red", "blue", "green", "yellow"];
// var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;


$(document).keypress(function () {
        if (!started) {
                $("#level-title").text("Level " + level);
                nextSequence();
                console.log("keypressFun")
                started = true;
        }
        
});
//Users Input part 
$(".btn").click(function () {
        var userChosenColor = $(this).attr("id")
        
        userClickedPattern.push(userChosenColor);
        console.log("user "+userClickedPattern);
        
        playSound(userChosenColor);

        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length -1 )

});

function checkAnswer(curreLevel) {
        if (gamePattern[curreLevel] === userClickedPattern[curreLevel]) {
                console.log("success "+curreLevel);

                if (userClickedPattern.length === gamePattern.length){
                        setTimeout(function(){
                                nextSequence();
                        },1000);
                }
                }else{
                        console.log("wrong");
                        playSound("wrong");

                        $("body").addClass("game-over");
                        setTimeout(function(){
                                $("body").removeClass("game-over");
                        },200);
                        $("#level-title").text("game Over, press any key to Restsrt")

                        startOver();
                }
}


//Choosing Random function
function nextSequence() {

        userClickedPattern = [];

        level++;
        $("#level-title").text("Level " + level);
        console.log("nestSequence"+level)


        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        console.log("Game "+gamePattern)



        $("#" + randomChosenColor).fadeOut(50).fadeIn(50);//Indicate which button to click


        //if we click on randomChosenColor ,the below function will be called
        playSound(randomChosenColor);

        // animatePress(randomChosenColor);

}


//Add sound when any key is pressed
function playSound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}


//this function will add animation when any button is pressed
function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
                $("#" + currentColor).removeClass("pressed");
        }, 100);
}

function startOver(){
        started = false;
        gamePattern = [];
        level = 0;
}
