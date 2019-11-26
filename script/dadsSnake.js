class DadsSnake extends Snake {

  constructor() {
    super({
      color: '#ad1457',
      accent: '#e35183',
      name: 'Fluffy',
      author: 'Dad',
    });
    this.favoredDirection = this.turnLeft();
  }

  update(dt, opponent, dimensions) {
    // dt = time since last update
    // opponent = array of boxes owned by my opponent
    // dimensions = height and width of the arena
    // this.body = array of boxes owned by me

    if (this.body.length === 1) {
      this.favoredDirection = this.turnLeft();
    }

    let move = this.moveDown();

    if (this.strategy === "diamond of doom") {
      if (this.isValidMove(this.favoredDirection, opponent, dimensions)) {
        move = this.favorDirection;
      } else if (this.isValidMove(this.turnLeft(), opponent, dimensions)) {
        move = this.turnLeft();
        this.favoredDirection = move;
      } else if (this.isValidMove(this.turnRight(), opponent, dimensions)) {
        move = this.turnRight();
        this.favoredDirection = move;
      } else if (this.isValidMove(this.goStraight(), opponent, dimensions)) {
        move = this.goStraight();
      }
    } else {
      if (this.isValidMove(this.favoredDirection, opponent, dimensions)) {
        move = this.favorDirection;
      } else if (this.isValidMove(this.turnLeft(), opponent, dimensions)) {
        move = this.turnLeft();
        this.favoredDirection = move;
      } else if (this.isValidMove(this.turnRight(), opponent, dimensions)) {
        move = this.turnRight();
        this.favoredDirection = move;
      } else if (this.isValidMove(this.goStraight(), opponent, dimensions)) {
        move = this.goStraight();
        this.favoredDirection = move;
      }
    }

    return move;
  }
}
snakeClasses.push(DadsSnake);