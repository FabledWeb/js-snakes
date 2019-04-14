class LeosSnake extends Snake {

    constructor() {
      super({
        color: '#d50000',
        accent: '#f44336',
        name: 'FyreFyte',
        author: 'Leo',
      });
    }

  update(dt, opponent, dimensions) {
    // dt = time since last update
    // opponent = array of boxes owned by my opponent
    // dimensions = height and width of the arena
    // this.body = array of boxes owned by me
    // to check if you can do a move:
    // if(this.isValidMove(this.moveUp(), opponent, dimensions)) {
    //   // do something
    // }

    let move;
    if (this.body.length === 1) {
      move = this.moveUp();
    }
    else if (this.isValidMove(this.turnLeft(), opponent, dimensions)) {
      move = this.turnLeft();
    }  
    else if (this.isValidMove(this.goStraight(), opponent, dimensions)) {
      move = this.goStraight();
    }
    else {
      move = this.turnRight();
    }  
    
    return move;
    
  }
}
snakeClasses.push(LeosSnake);