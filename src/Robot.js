class Robot {
  constructor(x, y, direction, world) {
    this.x = x;
    this.y = y;
    this.orientation = this.mapDirection(direction);
    this.world = world;
    this.isLost = false;
  }

  move(direction) {
    if (this.isLost) {
      return false;
    }

    switch (direction) {
    case 'L':
      this.orientation = this.orientation === 0 ? 270 : this.orientation - 90;
      break;
    case 'R':
      this.orientation = this.orientation === 270 ? 0 : this.orientation + 90;
      break;
    case 'F':
      this.moveForward();
      break;
    }

  }

  moveForward() {
    const coords = { x: this.x, y: this.y, orientation: this.orientation };
    if (this.world.notAgain(coords)) {
      return false;
    }

    let possibleCoords = Object.assign({}, coords);
    switch (this.orientation) {
    case 0:
      possibleCoords.y += 1;
      break;
    case 90:
      possibleCoords.x += 1;
      break;
    case 180:
      possibleCoords.y -= 1;
      break;
    case 270:
      possibleCoords.x -= 1;
      break;
    }

    this.isLost = this.world.isLost(possibleCoords, coords);
    if (!this.isLost) {
      this.x = possibleCoords.x;
      this.y = possibleCoords.y;
    }
  }

  mapDirection(direction) {
    switch (direction) {
    case 'N':
      return 0;
    case 'E':
      return 90;
    case 'S':
      return 180;
    case 'W':
      return 270;
    }
  }

  mapOrientation(orientation) {
    switch (orientation) {
    case 0:
      return 'N';
    case 90:
      return 'E';
    case 180:
      return 'S';
    case 270:
      return 'W';
    }
  }

  info() {
    let info = this.x + ' ' + this.y + ' ' + this.mapOrientation(this.orientation);

    if (this.isLost) {
      info += ' LOST';
    }

    return info;
  }
}

export default Robot;
