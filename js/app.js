//Problem: No user interaction causes no change to application.
//Solution: When user interacts cause changes appropriately.

var $color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  //update the new color span
  $("#newColor").css("background-color", "rgb(" + r + ", " + g + ", " + b + ")");
}

//1. When clicking on control list items
$(".controls").on("click", "li", function(){
  //Deselct the sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");
  //cache current color
  $color = $(this).css("background-color");  
});

//2. When add color is pressed
$("#revealColorSelect").click(function(){
  changeColor();
  //Show color selector or hide the selector
  $("#colorSelect").toggle();
});

//3. When color sliders change
$("input[type=range]").change(changeColor);

//4. When add color is pressed
$("#addNewColor").click(function() {
  //Append the color to the controls ul
  var $newColor = $("<li></li>")
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //select the new color
  $newColor.click();
});

//5. On mouse events on the canves
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e) {
  //Draw lines
  if(mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = $color;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function() {
  mouseDown = false;
}).mouseleave(function() {
  $canvas.mouseup();
});