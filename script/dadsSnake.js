class DadsSnake extends Snake {

  // Technique:
  //   Fill as much space as you can without leaving any gaps by
  //   trying to turn left as much as you can until you have to turn right,
  //   then trying to turn right as much as you can... repeat.
  //   New: also always turn 1 square away from obstacles, which leaves
  //   many traps.

  constructor() {
    super({
      color: '#ad1457',
      accent: '#e35183',
      name: 'Fluffy',
      author: 'Dad',
    });
    this.favoredDirection = this.turnLeft();
    this.favoredTurnDirection = DIRECTION.left;
  }

  isStraightClearTwoSpaces(turnDirection, opponent, dimensions) {
    const currentDirection = this.currentDirection();
    const head = this.head();
    let oneSpace;
    let twoSpaces;
    let newDirection = currentDirection;

    // figure out which direction you will be facing after turning
    if (turnDirection === DIRECTION.left) {
      switch(currentDirection) {
        case DIRECTION.up:
          newDirection = DIRECTION.left;
          break;
        case DIRECTION.down:
          newDirection = DIRECTION.right;
          break;
        case DIRECTION.left:
          newDirection = DIRECTION.down;
          break;
        case DIRECTION.right:
          newDirection = DIRECTION.up;
          break;
      }
    } else if (turnDirection === DIRECTION.right) {
      switch(currentDirection) {
        case DIRECTION.up:
          newDirection = DIRECTION.right;
          break;
        case DIRECTION.down:
          newDirection = DIRECTION.left;
          break;
        case DIRECTION.left:
          newDirection = DIRECTION.up;
          break;
        case DIRECTION.right:
          newDirection = DIRECTION.right;
          break;
      }
    }

    if (newDirection === DIRECTION.up) {
      oneSpace = {x: head.x, y: head.y-1};
      twoSpaces = {x: head.x, y: head.y-2};
    } else if (newDirection === DIRECTION.down) {
      oneSpace = {x: head.x, y: head.y+1};
      twoSpaces = {x: head.x, y: head.y+2};
    } else if (newDirection === DIRECTION.left) {
      oneSpace = {x: head.x-1, y: head.y};
      twoSpaces = {x: head.x-2, y: head.y};
    } else {
      oneSpace = {x: head.x+1, y: head.y};
      twoSpaces = {x: head.x+2, y: head.y};
    }
    // check both the first space in this direction and the one after that
    return this.isValidMove(oneSpace, opponent, dimensions)
          && this.isValidMove(twoSpaces, opponent, dimensions);
  }

  update(dt, opponent, dimensions) {
    // dt = time since last update
    // opponent = array of boxes owned by my opponent
    // dimensions = height and width of the arena
    // this.body = array of boxes owned by me

    if (this.body.length === 1) {
      this.favoredDirection = this.turnLeft();
      this.favoredTurnDirection = DIRECTION.left;
    }

    let move = this.moveUp();

    if (this.body.length === 1) {
      // for first step pick a way that's safe
      if (this.isValidMove(this.moveUp(), opponent, dimensions)) {
        move = this.moveUp();
      } else if (this.isValidMove(this.moveDown(), opponent, dimensions)) {
        move = this.moveDown();
      } else if (this.isValidMove(this.moveLeft(), opponent, dimensions)) {
        move = this.moveLeft();
      } else {
        move = this.moveRight();
      }
    } else if (this.favoredTurnDirection === DIRECTION.left) {
      // prefer to keep turning left
      if (this.isValidMove(this.turnLeft(), opponent, dimensions)) {
        move = this.turnLeft();
      } else if (this.isStraightClearTwoSpaces(DIRECTION.none, opponent, dimensions)) {
        move = this.goStraight();
      } else if (this.isValidMove(this.turnRight(), opponent, dimensions)) {
        move = this.turnRight();
        this.favoredTurnDirection = DIRECTION.right;
      } else {
        move = this.goStraight();
      }
    }
    else {
      // prefer to keep turning right
      if (this.isValidMove(this.turnRight(), opponent, dimensions)) {
        move = this.turnRight();
      } else if (this.isStraightClearTwoSpaces(DIRECTION.none, opponent, dimensions)) {
        move = this.goStraight();
      } else if (this.isValidMove(this.turnLeft(), opponent, dimensions)) {
        move = this.turnLeft();
        this.favoredTurnDirection = DIRECTION.left;
      } else {
        move = this.goStraight();
      }
    }

    return move;
  }
}
snakeClasses.push(DadsSnake);