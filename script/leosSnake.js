class LeosSnake extends Snake {
  constructor() {
    super({
      color: "#d50000",
      accent: "#f44336",
      name: "FyreFyte",
      author: "Leo"
    });
  }

  check2spotsahead(direction, opponent, dimensions) {
    const newDirection = {
      x: direction.x,
      y: direction.y
    };
    const currentDirection = this.currentDirection();
    const directions = Snake.DIRECTION;
    if (currentDirection === directions.down) {
      newDirection.y += 1;
    } else if (currentDirection === directions.up) {
      newDirection.y -= 1;
    } else if (currentDirection === directions.right) {
      newDirection.x += 1;
    } else if (currentDirection === directions.left) {
      newDirection.x -= 1;
    }
    if (this.isValidMove(newDirection, opponent, dimensions)) {
      return true;
    } else {
      return false;
    }
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
    } else if (this.isValidMove(this.turnRight(), opponent, dimensions)) {
      move = this.turnRight();
    } else if (this.check2spotsahead(this.goStraight(), opponent, dimensions)) {
      move = this.goStraight();
    } else {
      move = this.turnLeft();
    }

    return move;
  }
}
snakeClasses.push(LeosSnake);
