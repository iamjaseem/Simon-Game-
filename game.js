buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
var start=false;
var level=0;
$(".btn").click(handleClick);
function handleClick(){
  //targeting the color user clciked on.
  var userChosenColor=$(this).attr("id");
  //push the chosen to userClickedPattern array.
  userClickedPattern.push(userChosenColor);
  //checking answer of the clicked pattern agianst game pattern .-1 bcos starting from level 1 in game.
  checkAnwser(userClickedPattern.length-1 /*current level*/);
  // play the sound when user clciks on a color
  playSound(userChosenColor);
  //console.log(audio);
  //console.log(userClickedPattern);
  // animate when user clicks.
  animatePress(userChosenColor);
}

//starting the game
//deter the keypress
$(document).keydown(function(){
  //initally start was set to false
  if(!start){
    //the game starts here
  $("#level-title").text("Level " + level);
  //the next sequence is called
    nextSequence();
    //start is set to true,indicating game has started.
    start=true;
  }
});


function nextSequence(){
  //each time next sequence is called(next level) the userClickedPattern is reset to empty
  userClickedPattern=[];
  // increase level each time next sequence is called
  level++;
  $("#level-title").text("Level "+level);
  // generating random no:
  var randomNo= Math.floor(Math.random()*4);
  // assign the random number to index of button colors
  var randomChosenColor=buttonColors[randomNo];
  //psuh random color to gamePattern array
  gamePattern.push(randomChosenColor);
  //animate the random color(flashing)
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //flashing the chosen button
  playSound(randomChosenColor);



}

//playing the sounds
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
//animate when user clicks
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  //aniamtion(class) removed in 100ms
  setTimeout(function() {
			$("#"+currentColor).removeClass("pressed");
		}, 100);
}

//checking answers
function checkAnwser(currentLevel){
  // checking the userclickedpattern at current level to game pattern at current level.
  console.log("userclciked= "+ userClickedPattern[currentLevel]);
    console.log("gamepattern= "+ gamePattern[currentLevel]);
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    //checking if both the lenght matches. and if its true then calling the next sequence after 1000ms
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);


    }
  }
  else {
//game is over
  playSound("wrong");
  //add game over animation
  $("body").addClass("game-over");
  setTimeout(function () {
  $("body").removeClass("game-over");
}, 200);
  $("h1").text("Game over,Press Any Key to restart");
  //the game is reset
  startOver();
  }
}
//resetting game
function startOver(){
  level=0;//set to 0
  gamePattern=[];//set to empty
  start=false;//set to false
}
