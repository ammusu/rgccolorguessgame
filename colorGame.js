var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisp = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var gameOver = false;
var squareClicks = 0;

init();

function init () {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons () {
    for(var x = 0; x<modeButtons.length; x++){
        modeButtons[x].addEventListener("click", function(){
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        modeButtons[2].classList.remove("selected");
        this.classList.add("selected");

        switch(this.textContent){
           case "Easy": 
           numSquares = 3;
           break;
           case "Normal": 
           numSquares = 6;
           break;
           case "Hard": 
           numSquares = 9;
           break;
        }
        reset();
        });
    }
}

function setupSquares() {

    for (var i=0; i<squares.length; i++){
        squares[i].addEventListener("click", function(){
            gameOver ? null : squareClicks++;
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!" + " You guessed it in " + squareClicks + " clicks.";
                changeColors(clickedColor);
                colorDisp.style.background = clickedColor;
                resetButton.textContent = "Play Again?";
                gameOver = true;
            }
            else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again.";
            }
        })
    }
}

function reset() {
    colors = generateRandomColors(numSquares); 
    pickedColor = pickColor();
    colorDisp.textContent = pickedColor;
    for (var i=0; i<squares.length; i++){
        if (colors[i]){
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
            }
        else { 
            squares[i].style.display = "none";
            }
    }
   colorDisp.style.backgroundColor = "steelblue";
   resetButton.textContent = "New Colors";
   messageDisplay.textContent = "";
}

resetButton.addEventListener("click", function () {
    reset();
});

function changeColors(color) {
    for(var i=0; i<squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
  var random = Math.floor(Math.random() * colors.length); 
  return colors[random]; 
}

function generateRandomColors(num){
    var arr = [];
    for(var i=0; i<num; i++ ){
        arr[i] = randomColor(); 
    }
    return arr;
}

function randomColor () {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = "rgb(" + r + ", " + g + ", " + b + ")";
    return color;
}

//modular design pattern
//no variables and functions declared on their own
//everything should be in objects
/*
    var game = {};

    game.init() = function (){
        //copy code form init function
    }

    game.init();
*/