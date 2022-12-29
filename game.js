var buttonColors = ["green","red","yellow","blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;

$(document).keypress(function(){ if(level == 0){ nextSequence(); }});

function nextSequence(){
  level++;
  $("h1").text("Level "+ level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("."+randomChosenColor).addClass("opacity");
  setTimeout(function(){$("."+randomChosenColor).removeClass("opacity")},200);
  playSound(randomChosenColor);

  userPattern = [];
}

$("button").click(function(){ 
  userPattern.push(this.id);
  playSound(this.id);
  animatePress(this.id);

  if((level>0) && (gamePattern.length == userPattern.length)){
    checkAnswer();
  }
});

function checkAnswer(){
  for(var i = 0; i<level; i++){
    if(gamePattern[i] == userPattern[i]){        
    } else{
      level = 0;
      gamePattern = [];
      userPattern = [];
      $("h1").text("Game Over, Press Any Key to Restart");
      playSound("wrong");
      $("body").addClass("bodyGameOver");
      setTimeout(function(){$("body").removeClass("bodyGameOver");},300);
    }  
  }
  if(level>0){
    setTimeout(function(){ nextSequence();},500);
  }
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){ $("."+currentColor).removeClass("pressed")},100);
}
