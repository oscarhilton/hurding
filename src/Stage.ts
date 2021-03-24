import { World } from "cannon";
import Duck from "./Duck";
import ThreeInstance from "./ThreeInstance";
import TheeInstance from "./ThreeInstance";
import Levels from "./Levels";
import Level from "./Level";

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
  level: Level | null;

  constructor() {
    // Set up THREE
    this.three = new TheeInstance();
    // Create the world
    this.world = new World();
    // Set the ducks array
    this.ducks = [];
    // Set up time vars
    this.fixedTimeStep = 1.0 / 60.0; // seconds
    this.maxSubSteps = 10;
    // Number of starting ducks
    this.totalDucks = 100;
    // Clock
    this.clock = 0;

    // Levels
    this.level = null;
    this.currentLevelIndex = 0;
  
    // Handle THREE setup
    this.three.setup();
    // Set up game;
    this.setupGame();
  }

  showDebugGizmos() {

  }

  setupGame() {
    console.log("SETTING UP GAME");
    // Set up level
    const level = Levels[this.currentLevelIndex];
    level.setup(this.ducks, this.totalDucks, this.world, this.three.scene, this.three);
    // Set the gravity
    this.world.gravity.set(0, 0, GRAVITY);
    // Set up all the ducks
    for (var duck of this.ducks) {
      duck.setup();
    }
    // Run the loop
    this.level = level;
    this.loop();
  }

  simulationLoop(time: number) {
    const dt = (time - this.clock) / 1000;
    this.world.step(this.fixedTimeStep, dt, this.maxSubSteps);
    return this.clock = time;
  }

  renderLoop() {
    return this.three.handleRender();
  }

  loop() {
    if (this.level) {
      requestAnimationFrame(this.loop.bind(this));
      this.simulationLoop(0);
      this.level.update(this.three.scene, this.ducks);
      this.renderLoop();
    }
  }
}