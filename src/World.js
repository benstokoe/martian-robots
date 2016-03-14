class World {
  constructor(x, y) {
    if (x > 50 || y > 50) {
      throw new Error('Coordinates cannot be higher than 50');
    }

    this.size = { x, y };
    this.deaths = [];
  }

  isLost(coordinates, originalCoords) {
    const { x, y } = coordinates;
    if (x > this.size.x || y > this.size.y || x < 0 || y < 0) {
      this.deaths.push(originalCoords);
      return true;
    }
    return false;
  }

  notAgain(coordinates) {
    return this.deaths.find(death => {
      return death.x === coordinates.x &&
             death.y === coordinates.y &&
             death.orientation === coordinates.orientation;
    });
  }
}

export default World;
