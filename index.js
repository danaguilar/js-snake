$(document).ready(function() {
  var cw = $(".container").width();
  var ch = $(".container").height();
  var createGrid = function(cw, ch){
    var $container = $(".container")
    for (i = 0; i < ch/20; i++){
      var $newRow = $("<div class = 'row'></div>");
      for (j = 0; j < cw/20; j++){
        $newRow.append("<div class = 'square' id = r" + i + "c"+ j + "></div>");
      };
      $container.append($newRow);
    };
  };
  var makeActive = function(row, column){
    var id = "#r" +row + "c " + column;
    console.log(id);
    $(id).addClass('active');
  };

  var player = {
    BGcolor : "green",
    row : 2,
    col : 3,
    draw : function(){
      var $square = $("#r" + this.row + "c" + this.col);
      $square.css("background-color", this.BGcolor);
      $square.addClass('active');
    },
    remove : function(){
      var $square = $("#r" + this.row + "c" + this.col);
      $square.css("background-color", "transparent");
      $square.removeClass('active');
    },
    moveLeft : function(){
      this.remove();
      this.col -= 1;
      this.draw();
    },
    moveRight : function(){
      this.remove();
      this.col += 1;
      this.draw();
    },
    moveUp : function(){
      this.remove();
      this.row -= 1;
      this.draw();
    },
    moveDown : function(){
      this.remove();
      this.row += 1;
      this.draw();
    },
  };
  createGrid(cw,ch);
  player.draw();
  $(document).on('keydown',(function (event){
    switch(event.which){
      case 38:
        console.log("moving up");
        player.moveUp();
        break;
      case 40:
        player.moveDown();
        break;
      case 37:
        player.moveLeft();
        break;
      case 39:
        player.moveRight();
        break;
      default:
        break;
    }
  }));
});
