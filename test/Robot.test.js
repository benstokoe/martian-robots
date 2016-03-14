import { expect } from 'chai';

import World from '../src/World';
import Robot from '../src/Robot';

describe('Robot', () => {
  it('should be constructed using values passed in', () => {
    const world = new World(10, 10);
    const robot = new Robot(10, 10, 'N', world);

    expect(robot.x).to.equal(10);
    expect(robot.y).to.equal(10);
    expect(robot.orientation).to.equal(0);
    expect(robot.world).to.equal(world);
    expect(robot.isLost).to.equal(false);
  });

  it('should turn when given a direction L or R', () => {
    const world = new World(10, 10);
    const robot = new Robot(10, 10, 'N', world);

    robot.move('L');
    expect(robot.orientation).to.equal(270);
    robot.move('L');
    expect(robot.orientation).to.equal(180);
    robot.move('L');
    expect(robot.orientation).to.equal(90);
    robot.move('L');
    expect(robot.orientation).to.equal(0);

    robot.move('R');
    expect(robot.orientation).to.equal(90);
    robot.move('R');
    expect(robot.orientation).to.equal(180);
    robot.move('R');
    expect(robot.orientation).to.equal(270);
    robot.move('R');
    expect(robot.orientation).to.equal(0);
  });

  it('should move forward when given a direction F', () => {
    const world = new World(10, 10);
    const robot = new Robot(5, 5, 'N', world);
    robot.move('F');
    expect(robot.y).to.equal(6);

    const robot2 = new Robot(5, 5, 'E', world);
    robot2.move('F');
    expect(robot2.x).to.equal(6);

    const robot3 = new Robot(5, 5, 'S', world);
    robot3.move('F');
    expect(robot3.y).to.equal(4);

    const robot4 = new Robot(5, 5, 'W', world);
    robot4.move('F');
    expect(robot4.x).to.equal(4);
  });

  it('should see if it is lost when it moves', () => {
    const world = new World(10, 10);
    const robot = new Robot(10, 10, 'N', world);
    robot.move('F');
    expect(robot.isLost).to.equal(true);
    expect(robot.x).to.equal(10);
    expect(robot.y).to.equal(10);
  });

  it('should take no further actions if lost', () => {
    const world = new World(10, 10);
    const robot = new Robot(10, 10, 'N', world);
    robot.move('F');
    expect(robot.move('L')).to.equal(false);
  });

  it('should not move if a robot already died in that spot', () => {
    const world = new World(10, 10);
    const robot = new Robot(10, 10, 'N', world);

    world.deaths = [{ x: 10, y: 10, orientation: 0 }];

    robot.move('F');
    expect(robot.x).to.equal(10);
    expect(robot.y).to.equal(10);
    expect(robot.isLost).to.equal(false);
  });

  it('should map the orientation to letters', () => {
    const robot = new Robot(10, 10, 'N');
    expect(robot.mapOrientation(0)).to.equal('N');
    expect(robot.mapOrientation(90)).to.equal('E');
    expect(robot.mapOrientation(180)).to.equal('S');
    expect(robot.mapOrientation(270)).to.equal('W');
  });

  it('should map the direction to orientation', () => {
    const robot = new Robot(10, 10, 'N');
    expect(robot.mapDirection('N')).to.equal(0);
    expect(robot.mapDirection('E')).to.equal(90);
    expect(robot.mapDirection('S')).to.equal(180);
    expect(robot.mapDirection('W')).to.equal(270);
  });
});
