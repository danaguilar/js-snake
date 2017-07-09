$(document).ready(function() {
  var cw = $(".container").width()/20;
  var ch = $(".container").height()/20;
  var colorProgression = ["DarkGreen", "SpringGreen","YellowGreen","Gold","DarkOrange","OrangeRed","Crimson","DarkRed"]
  var createGrid = function(cw, ch){
    var $container = $(".container")
    for (i = 0; i < ch; i++){
      var $newRow = $("<div class = 'row'></div>");
      for (j = 0; j < cw; j++){
        $newRow.append("<div class = 'square' id = r" + i + "c"+ j + "></div>");
      };
      $container.append($newRow);
    };
  };
  var makeSnake = function(row, column){
    var id = "#r" +row + "c " + column;
    $(id).addClass('snake');
  };

  function segment(row, column){
    this.row = row;
    this.col = column;
    this.draw = function(){
        var $square = $("#r" + this.row + "c" + this.col);
        $square.addClass('snake');
      };
    this.remove = function() {
        var $square = $("#r" + this.row + "c" + this.col);
        $square.removeClass('snake');
      };

    this.makeHead =  function(direction) {
        var $square = $("#r" + this.row + "c" + this.col);
        switch(direction){
          case 'U':
            $square.addClass('up-head');
            break;
          case 'D':
            $square.addClass('down-head');
            break;
          case 'L':
            $square.addClass('left-head');
            break;
          case 'R':
            $square.addClass('right-head');
            break;

        }
      };

    this.removeHead = function() {
        var $square = $("#r" + this.row + "c" + this.col);
        $square.removeClass('right-head');
        $square.removeClass('left-head');
        $square.removeClass('up-head');
        $square.removeClass('down-head');
      };
  }

  var food = {
    row : 0,
    col : 0,
    newLocal : function(){
      do {
        this.row = Math.floor(Math.random()*ch);
        this.col = Math.floor(Math.random()*cw);
      }
      while(this.inSnake());
    },

    inSnake : function(){
      var $square = $("#r" + this.row + "c" + this.col);
      if($square.hasClass('snake')){return true;}
      return false;
    },

    draw : function(){
        var $square = $("#r" + this.row + "c" + this.col);
        $square.addClass('food');
    },

    remove : function() {
        var $square = $("#r" + this.row + "c" + this.col);
        $square.removeClass('food');
    }

  };

  var snake = {
    row : 2,
    col : 3,
    snakeSegs : [],
    moveList : [],
    length : 3,
    nextLevel : 7,
    atLevel: 0,
    speed: 100,
    direction : 'R',
    addSegement : function(){
      var newSegment = new segment(this.row, this.col);
      this.snakeSegs.push(newSegment);
      if(this.length <  this.snakeSegs.length){
        var oldSegment = this.snakeSegs.shift();
        oldSegment.remove();
        delete oldSegment;
      }
    },
    drawAll : function(){
      for(i = 0; i < this.snakeSegs.length; i++){
        this.snakeSegs[i].draw();
      }
    },

    legalSquare : function(){
      //if(this.row < 0 || this.row >= ch){return false;}
      //if(this.col<0 || this.col >= cw){return false;}
      var $square = $("#r" + this.row + "c" + this.col);
      if($square.hasClass('snake')){return false;}
      return true;
    },

    gotFood : function(){
      var $square = $("#r" + this.row + "c" + this.col);
      if($square.hasClass('food')){return true;}
      return false;
    },

    updateHead : function(){
      this.snakeSegs[this.length-1].makeHead(this.direction);
      this.snakeSegs[this.length-2].removeHead();
    },

    scoreFood : function(){
      this.length += 1;
      food.remove();
      food.newLocal();
      food.draw();
    },
    upLevel : function(){
      this.nextLevel += 7;
      this.speed *= .75;
      this.atLevel += 1;
      $(".container").css("border-color",colorProgression[this.atLevel]);
    },
    updateDirection : function(){
      if(this.moveList.length > 0){
        switch(this.moveList.shift()){
          case 'D':
            if(this.direction !== 'U'){this.direction = 'D';}
            break;
          case 'U':
            if(this.direction !== 'D'){this.direction = 'U';}
            break;
          case 'R':
            if(this.direction !== 'L'){this.direction = 'R';}
            break;
          case 'L':
            if(this.direction !== 'R'){this.direction = 'L';}
            break;
        }
      }
    },
    move : function(loop){
      this.updateDirection();
      switch(this.direction){
        case 'R':
          this.col += 1;
          if(this.col >= cw){this.col = 0}
          break;
        case 'L':
          this.col -= 1;
          if(this.col < 0){this.col = cw}
          break;
        case 'U':
          this.row -= 1;
          if(this.row < 0){this.row = ch}
          break;
        case 'D':
          this.row += 1;
          if(this.row >= ch){this.row = 0}
          break;
      }
      if(this.legalSquare()){
        if(this.gotFood()){this.scoreFood()}
        this.addSegement();
        this.updateHead();
        this.drawAll();
      }
      else{
        clearInterval(loop);
      }
      if(this.length > this.nextLevel){
        clearInterval(loop);
        this.upLevel();
        var gameLoop = setInterval(function(){snake.move(gameLoop);},snake.speed);
      }
    }
  };

  createGrid(cw,ch);
  $(document).on('keydown',(function (event){
    switch(event.which){
      case 38:
        snake.moveList.push('U');
        break;
      case 40:
        snake.moveList.push('D');
        break;
      case 37:
        snake.moveList.push('L');
        break;
      case 39:
        snake.moveList.push('R');
        break;
      default:
        break;
    }
  }));
  food.newLocal();
  food.draw();
  var gameLoop = setInterval(function(){snake.move(gameLoop);},snake.speed);
});
