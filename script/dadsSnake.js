class DadsSnake extends Snake {

  // Technique:
  //   Fill as much space as you can without leaving any gaps by
  //   trying to turn left as much as you can until you have to turn right,
  //   then trying to turn right as much as you can... repeat.

  constructor() {
    super({
      color: '#ad1457',
      accent: '#e35183',
      name: 'Fluffy',
      author: 'Dad',
    });
    this.favoredDirection = this.turnLeft();
    this.directions = Snake.DIRECTION;
    this.favoredTurnDirection = this.directions.left;
  }

  update(dt, opponent, dimensions) {
    // dt = time since last update
    // opponent = array of boxes owned by my opponent
    // dimensions = height and width of the arena
    // this.body = array of boxes owned by me

    if (this.body.length === 1) {
      this.favoredDirection = this.turnLeft();
      this.favoredTurnDirection = this.directions.left;
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
    } else if (this.favoredTurnDirection === this.directions.left) {
      // prefer to keep turning left
      if (this.isValidMove(this.turnLeft(), opponent, dimensions)) {
        move = this.turnLeft();
      } else if (this.isValidMove(this.goStraight(), opponent, dimensions)) {
        move = this.goStraight();
      } else {
        move = this.turnRight();
        this.favoredTurnDirection = this.directions.right;
      }
    }
    else {
      // prefer to keep turning right
      if (this.isValidMove(this.turnRight(), opponent, dimensions)) {
        move = this.turnRight();
      } else if (this.isValidMove(this.goStraight(), opponent, dimensions)) {
        move = this.goStraight();
      } else {
        move = this.turnLeft();
        this.favoredTurnDirection = this.directions.left;
      }
    }

    return move;
  }
}
snakeClasses.push(DadsSnake);