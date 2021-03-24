"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cannon_1 = require("cannon");
var ThreeInstance_1 = __importDefault(require("./ThreeInstance"));
var Levels_1 = __importDefault(require("./Levels"));
var GRAVITY = -9.82; // real world gravity;
var Stage = /** @class */ (function () {
    function Stage() {
        // Set up THREE
        this.three = new ThreeInstance_1.default();
        // Create the world
        this.world = new cannon_1.World();
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
    Stage.prototype.setupGame = function () {
        console.log("SETTING UP GAME");
        // Set up level
        var level = Levels_1.default[this.currentLevelIndex];
        level.setup(this.ducks, this.totalDucks, this.world, this.three.scene, this.three);
        // Set the gravity
        this.world.gravity.set(0, 0, GRAVITY);
        // Set up all the ducks
        for (var _i = 0, _a = this.ducks; _i < _a.length; _i++) {
            var duck = _a[_i];
            duck.setup();
        }
        // Run the loop
        this.level = level;
        this.loop();
    };
    Stage.prototype.simulationLoop = function (time) {
        var dt = (time - this.clock) / 1000;
        this.world.step(this.fixedTimeStep, dt, this.maxSubSteps);
        return this.clock = time;
    };
    Stage.prototype.renderLoop = function () {
        return this.three.handleRender();
    };
    Stage.prototype.loop = function () {
        if (this.level) {
            requestAnimationFrame(this.loop.bind(this));
            this.simulationLoop(0);
            this.level.update(this.ducks);
            this.renderLoop();
        }
    };
    return Stage;
}());
exports.default = Stage;
