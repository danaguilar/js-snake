$(document).ready(function() {
  var cw = $(".container").width();
  var ch = $(".container").height();
  var createGrid = function(cw, ch){
    var $container = $(".container")
    for(i = 0; i <= cw/10; i++){
      var $newRow = $("<div class = 'row'></div>");
      for(i = 0; i <= ch/10; i++){
        $newRow.append("<div class = 'square'></div>");
        console.log("appended square");
      };
      $container.append($newRow);
    };
  };
  console.log("starting creategrid");
  createGrid(cw,ch);
});
