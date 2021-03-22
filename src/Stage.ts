import { World } from "cannon";
import Duck from "./Duck";
import ThreeInstance from "./ThreeInstance";
import TheeInstance from "./ThreeInstance";
import TILES from './tiles';
import Levels from "./Levels";
import Tile, { SIZE as TILE_SIZE }  from "./Tiles/Tile";
import Water from "./Tiles/Water";
import Floor from "./Tiles/Floor";
import Rock from "./Tiles/Rock";
import Bridge from "./Tiles/Bridge";
import Distraction from "./Tiles/Distraction";
import Flock from "./Flock";
import DistractionRadius from "./DistractionRadius";

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
  flock: Flock | null;
  distractions: DistractionRadius[];

  constructor() {
    // Set up THREE
    this.three = new TheeInstance();
    // Create the world
    this.world = new World();
    // Set the ducks array
    this.ducks = [];
    this.flock = null;
    // Set up time vars
    this.fixedTimeStep = 1.0 / 60.0; // seconds
    this.maxSubSteps = 10;
    // Number of starting ducks
    this.totalDucks = 100;
    // Clock
    this.clock = 0;

    // Levels
    this.currentLevelIndex = 0;
    this.levelTiles = [];
    this.distractions = [];
  
    // Handle THREE setup
    this.setupThree();
    // Set up level;
    this.setupCurrentLevel();
  }

  setupThree() {
    console.log("SETTING UP THREE");
    this.three.setup();
  }

  setupGame() {
    console.log("SETTING UP GAME");
    // Set the gravity
    this.world.gravity.set(0, 0, GRAVITY);
    // Set up all the ducks
    for (var duck of this.ducks) {
      duck.setup();
    }
    // Run the loop
    this.loop();
  }

  setupCurrentLevel() {
    let cameraPosition = null;
    const level = Levels[this.currentLevelIndex];
    
    // run Z axis loop
    for (var z = 0; z < level.segmentsZ.length; z++) {
      const currentZ = level.segmentsZ[z];
      // run Y axis loop
      for (var y = 0; y < currentZ.rows.length; y++) {
        const currentY = currentZ.rows[y];
        // run X axis loop
        for (var x = 0; x < currentY.length; x++) {          
          switch(currentY[x]) {
            case TILES.water:
              this.levelTiles.push(new Water(x, y, z));
              break;
            case TILES.spawn:
              // Update camera position variable
              cameraPosition = { x: x * TILE_SIZE, y: y * TILE_SIZE };
              // Add the ducks
              if (this.totalDucks > 0) {
                const columnDucks = 10 % this.totalDucks;
                for (var col = 0; col < columnDucks; col++) {
                  for (var row = 0; row < this.totalDucks / columnDucks; row++) {
                    this.ducks.push(new Duck(this.world, this.three.scene, row * 1.1 + x * TILE_SIZE, col * 1.1 + y * TILE_SIZE));
                  }
                }
                this.flock = new Flock(this.ducks);
              }
            case TILES.floor:
              this.levelTiles.push(new Floor(x, y, z));
              break;
            case TILES.rock:
              this.levelTiles.push(new Rock(x, y, z));
              this.distractions.push(new DistractionRadius(this.ducks, x * TILE_SIZE, y * TILE_SIZE, z * TILE_SIZE, false, 0.1, 0.1));
              break;
            case TILES.bridge:
              this.levelTiles.push(new Bridge(x, y, z));
              break;
            case TILES.distraction:
              this.levelTiles.push(new Distraction(x, y, z));
              this.distractions.push(new DistractionRadius(this.ducks, x * TILE_SIZE, y * TILE_SIZE, z * TILE_SIZE, true));
              break;
            default:
              break;
          }
        }
      }
    }

    if (cameraPosition) {
      this.three.updateCamera(cameraPosition);
    }

    // Display level tiles
    for (var tile of this.levelTiles) {
      tile.setup(this.world, this.three.scene);
    }

    // Set the game
    this.setupGame();
  }

  simulationLoop(time: number) {
    const dt = (time - this.clock) / 1000;
    this.world.step(this.fixedTimeStep, dt, this.maxSubSteps);
    return this.clock = time;
  }

  updateGameObjects() {
    if (this.distractions.length > 0) {
      for (const distraction of this.distractions) {
        distraction.update()
      }
    }
    if (this.flock !== null) {
      this.flock.update();
    }
    for (var duck of this.ducks) {
      duck.update();
    }
    return;
  }

  renderLoop() {
    return this.three.handleRender();
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.simulationLoop(0);
    this.updateGameObjects();
    this.renderLoop();
  }
}