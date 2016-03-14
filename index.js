import Robot from './src/Robot';
import World from './src/World';

const world = new World(5,3);

const robot1 = new Robot(1, 1, 'E', world);
const robot2 = new Robot(3, 2, 'N', world);
const robot3 = new Robot(0, 3, 'W', world);

const robot1Moves = 'RFRFRFRF'.split('');
robot1Moves.forEach(move => robot1.move(move));

const robot2Moves = 'FRRFLLFFRRFLL'.split('');
robot2Moves.forEach(move => robot2.move(move));

const robot3Moves = 'LLFFFLFLFL'.split('');
robot3Moves.forEach(move => robot3.move(move));

console.log(robot1.info());
console.log(robot2.info());
console.log(robot3.info());
