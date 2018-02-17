/**
* snake game by samy ouaret
*  https://github.com/samyouaret/snake-game/upload/master
* this code may have some bugs try to fix it :D
* feel free to fork it or download it
*/
function snake(){
    this.list =[0,1,2];
    this.sDir = 1;
    this.head = 2;
    this.maxTop = 179;
    this.unit = 15;
    this.node = -1;
    this.speed = 300;
    this.container = document.getElementById("container");
    this.createContainer = function()
    {
      for (var i = 0; i < 180; i++) {
          var chi = document.createElement("div");
          chi.className = "unit";
        //  chi.innerHTML = i;
          this.container.appendChild(chi);
      }
    };
    /*
    insert  at Head(last)
    remove from first
    move vertically by 15 units
    move horizontally by 1 unit
    */
    this.move = function(newDir){
          var newHead = this.getNewHeadPos(newDir);
          if(this.isAlife(newHead)){
            this.head = newHead;
            /* remove last element*/
            this.colorNode(this.list.shift(),"#e3e3e3");
            /*push new head to be the head of snake*/
            this.list.push(newHead);
            /* set the new Head bachground*/
            this.colorNode(newHead,"#f45a36e8");
            return true;
          }else {
            return false;
          }
    };
    /*
    **top 0
    **right 1
    **left 2
    **bottom 3
    get the next head
    */
    this.getNewHeadPos = function(newDir){
          this.updateDir(newDir);
        switch (this.sDir) {
          case 0:
          newHead = this.head - this.unit;
          break;
          case 1:
          newHead = this.head +1;
          break;
          case 2:
          newHead = this.head - 1;
          break;
          case 3:
          newHead = this.head + this.unit;
          break;
        }
        return newHead;
    };
    /** update direction of the snake  if are not in In reverse*/
    this.updateDir = function(newDir){
          if(newDir ==0 && this.sDir!=3){
            this.sDir = newDir;
          }
          else if(newDir ==1 && this.sDir!=2){
            this.sDir = newDir;
          }
          else if(newDir ==2 && this.sDir!=1){
            this.sDir = newDir;
          }
          else if(newDir ==3 && this.sDir!=0){
            this.sDir = newDir;
          }
    };
    this.eat = function(){
      /**
       move than eat to avoid bugs
       we compare the node to the node with index length-1
       rather the head
       the make the mecanism work
        */
        if(this.node==this.list[this.list.length-1]){
          var newHead = this.getNewHeadPos(this.node);
            if(!this.isAlife(newHead)){
              return false;
            }
            this.list.push(newHead);
            this.head = newHead;
            this.colorNode(this.head,"#f45a36e8");
            this.node = -1;
            return true;
        }
    };
    this.createNode = function(){
      /** conditions are node ==-1 or node found in list
      * get random node
      */
      while (this.node==-1 || this.list.indexOf(this.node)>-1) {
        this.node  = Math.floor(Math.random()*179);
      }
      this.colorNode(this.node,"#afe21f");
    };
    this.isAlife = function(newHead){
        if(this.list.indexOf(newHead)==-1){
           /* top/bottom passed*/
           if(newHead < 0 || newHead >this.maxTop){
             return false;
           }
           /* right passed*/
           else if(this.sDir == 1 && newHead%this.unit==0){
             return false;
           }
           /* left passed*/
           else if(this.sDir == 2 && this.head %this.unit==0){
             return false;
           }
           /* top/bottom passed*/
           return true;
        }else {
          /* head touchs snake's body*/
          return false;
        }
    };
    this.fillNodes = function(){
      for (var i = 0; i < this.list.length; i++) {
            this.colorNode(this.list[i],"#f45a36e8");
      }
    };
    this.colorNode = function(i,col){
        this.container.children[i].style= "background :" + col;
    };
}
/** restart the game  (reload the page)**/
function restart(){
  location.reload();
}
var snakeGame = new snake();
/** create game table(matrix)*/
snakeGame.createContainer();
/* fill matrix elements*/
snakeGame.fillNodes();
var gameOver =document.getElementById("gameOver");
/**play function **/
function playSnake() {
  var startGame =document.getElementById("startGame");
  startGame.style = "display:none";
  var timer = setInterval(function(){
    /* create random node in the matrix and fill it
    ** move than eat to avoid bugs
    */
    snakeGame.createNode();
    /// if the snake is not alife clear the timer
    // show the game ovder mesg
    if(!snakeGame.move(snakeGame.sDir)){
      clearInterval(timer);
      gameOver.style = "display:block";
      return false;
    }
    snakeGame.eat();
  },snakeGame.speed);
  document.onkeyup = function(evt) {
      evt = evt || window.event;
      var newDir = snakeGame.Dir;
  switch (evt.keyCode) {
    case 38:
        newDir = 0;
    break;
    case 39:
        newDir = 1;
    break;
    case 37:
        newDir = 2;
    break;
    case 40:
        newDir = 3;
    break;
  }
  snakeGame.updateDir(newDir);
  }
}
