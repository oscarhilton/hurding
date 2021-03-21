import { World } from "cannon";
import Duck from "./Duck";
import Ground from "./Ground";
import ThreeInstance from "./ThreeInstance";
import TheeInstance from "./ThreeInstance";
import TILES from './tiles';
import Levels from "./Levels";
import Tile, { SIZE as TILE_SIZE }  from "./Tiles/Tile";
import Water from "./Tiles/Water";
import Floor from "./Tiles/Floor";

console.log(Levels);

const GRAVITY = -9.82 // real world gravity;

export default class Stage {
  three: ThreeInstance;
  ctx: any;
  world: World;
  ducks: Duck[];
  // ground: Ground;
  totalDucks: number;
  fixedTimeStep: number;
  maxSubSteps: number;
  clock: number;
  currentLevelIndex: number;
  levelTiles: Tile[];

  constructor() {
    // Set up THREE
    this.three = new TheeInstance();
    // Create the world
    this.world = new World();
    // Set the ducks array
    this.ducks = [];
    // Add the ground
    // this.ground = new Ground(this.world, this.three.scene);
    // Set up time vars
    this.fixedTimeStep = 1.0 / 60.0; // seconds
    this.maxSubSteps = 3;
    // Number of starting ducks
    this.totalDucks = 50;
    // Clock
    this.clock = 0;

    // Levels
    this.currentLevelIndex = 0;
    this.levelTiles = [];
  
    // Handle THREE setup
    this.setupThree();
    // Handle game setup
    this.setupGame();
  }

  setupThree() {
    console.log("SETTING UP THREE");
    this.three.setup();
  }

  setupGame() {
    console.log("SETTING UP GAME");
    // Set the gravity
    this.world.gravity.set(0, 0, GRAVITY);
    // Set the ground
    // this.ground.setup();
    // Load level
    this.setupCurrentLevel();
    // Run the loop
    this.loop();
  }

  setupCurrentLevel() {
    const level = Levels[this.currentLevelIndex];
    
    // run Z axis loop
    for (var z = 0; z < level.segmentsZ.length; z += TILE_SIZE) {
      const currentZ = level.segmentsZ[z];
      // run Y axis loop
      for (var y = 0; y < currentZ.rows.length; y += TILE_SIZE) {
        const currentY = currentZ.rows[y];
        // run X axis loop
        for (var x = 0; x < currentY.length; x += TILE_SIZE) {
          switch(currentY[x]) {
            case TILES.water:
              this.levelTiles.push(new Water(x, y, z));
              break;
            case TILES.floor:
              this.levelTiles.push(new Floor(x, y, z));
              break;
            default:
              break;
          }
        }
      }
    }

    // Display level tiles
    for (var tile of this.levelTiles) {
      tile.setup(this.world, this.three.scene);
    }

    // Add the ducks
    if (this.totalDucks > 0) {
      const columnDucks = 5 % this.totalDucks;
      for (var col = 0; col < columnDucks; col++) {
        for (var row = 0; row < this.totalDucks / columnDucks; row++) {
          this.ducks.push(new Duck(this.world, this.three.scene, row, col));
        }
      }
    }
  }

  simulationLoop(time: number) {
    const dt = (time - this.clock) / 1000;
    this.world.step(this.fixedTimeStep, dt, this.maxSubSteps);
    return this.clock = time;
  }

  updateGameObjects() {
    for (var duck of this.ducks) {
      duck.update();
    }
  }

  renderLoop() {
    this.three.handleRender();
  }

  loop() {
    this.simulationLoop(0);
    this.renderLoop();
    this.updateGameObjects();
    requestAnimationFrame(this.loop.bind(this));
  }
}