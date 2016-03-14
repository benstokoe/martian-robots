import { expect } from 'chai';

import World from '../src/World';
import Robot from '../src/Robot';

describe('World', () => {
  it('should be constructed using values passed in', () => {
    const world = new World(10, 10);
    const expected = { x: 10, y: 10 };

    expect(world.size).to.deep.equal(expected);
  });

  it('should work out if a robot can move', () => {
    const world = new World(10, 10);
    
    const isLostX = world.isLost({ x: 11, y: 10 }, {});
    expect(isLostX).to.equal(true);

    const isLostY = world.isLost({ x: 10, y: 11 }, {});
    expect(isLostY).to.equal(true);

    const isLostXNegative = world.isLost({ x: -1, y: 10 }, {});
    expect(isLostXNegative).to.equal(true);

    const isLostYNegative = world.isLost({ x: 10, y: -1 }, {});
    expect(isLostYNegative).to.equal(true);
  });

  it('should mark it as a death if a robot is lost', () => {
    const world = new World(10, 10);
    const iAmLost = world.isLost(
      { x: 10, y: 11, orientation: 0 },
      { x: 10, y: 10, orientation: 0 }
    );

    expect(world.deaths).to.deep.equal([{ x: 10, y: 10, orientation: 0 }]);
  });

  it('should not let a robot go off the same grid as another', () => {
    const world = new World(10, 10);
    world.deaths = [{ x: 10, y: 3, orientation: 90 }];

    const dontDie = world.notAgain({ x: 10, y: 3, orientation: 90 });
    expect(dontDie).to.be.defined;
  });

  it('should not accept coordinates higher than 50', () => {
    try {
      new World(51, 10);
    } catch(e) {
      const err = new Error('Coordinates cannot be higher than 50');
      expect(e).to.deep.equal(err);
    }
  });
});
