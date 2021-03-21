"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cannon_1 = require("cannon");
var Duck_1 = __importDefault(require("./Duck"));
var ThreeInstance_1 = __importDefault(require("./ThreeInstance"));
var tiles_1 = __importDefault(require("./tiles"));
var Levels_1 = __importDefault(require("./Levels"));
var Tile_1 = require("./Tiles/Tile");
var Water_1 = __importDefault(require("./Tiles/Water"));
var Floor_1 = __importDefault(require("./Tiles/Floor"));
console.log(Levels_1.default);
var GRAVITY = -9.82; // real world gravity;
var Stage = /** @class */ (function () {
    function Stage() {
        // Set up THREE
        this.three = new ThreeInstance_1.default();
        // Create the world
        this.world = new cannon_1.World();
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
    Stage.prototype.setupThree = function () {
        console.log("SETTING UP THREE");
        this.three.setup();
    };
    Stage.prototype.setupGame = function () {
        console.log("SETTING UP GAME");
        // Set the gravity
        this.world.gravity.set(0, 0, GRAVITY);
        // Set the ground
        // this.ground.setup();
        // Load level
        this.setupCurrentLevel();
        // Run the loop
        this.loop();
    };
    Stage.prototype.setupCurrentLevel = function () {
        var level = Levels_1.default[this.currentLevelIndex];
        // run Z axis loop
        for (var z = 0; z < level.segmentsZ.length; z += Tile_1.SIZE) {
            var currentZ = level.segmentsZ[z];
            // run Y axis loop
            for (var y = 0; y < currentZ.rows.length; y += Tile_1.SIZE) {
                var currentY = currentZ.rows[y];
                // run X axis loop
                for (var x = 0; x < currentY.length; x += Tile_1.SIZE) {
                    switch (currentY[x]) {
                        case tiles_1.default.water:
                            this.levelTiles.push(new Water_1.default(x, y, z));
                            break;
                        case tiles_1.default.floor:
                            this.levelTiles.push(new Floor_1.default(x, y, z));
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        // Display level tiles
        for (var _i = 0, _a = this.levelTiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            tile.setup(this.world, this.three.scene);
        }
        // Add the ducks
        if (this.totalDucks > 0) {
            var columnDucks = 5 % this.totalDucks;
            for (var col = 0; col < columnDucks; col++) {
                for (var row = 0; row < this.totalDucks / columnDucks; row++) {
                    this.ducks.push(new Duck_1.default(this.world, this.three.scene, row, col));
                }
            }
        }
    };
    Stage.prototype.simulationLoop = function (time) {
        var dt = (time - this.clock) / 1000;
        this.world.step(this.fixedTimeStep, dt, this.maxSubSteps);
        return this.clock = time;
    };
    Stage.prototype.updateGameObjects = function () {
        for (var _i = 0, _a = this.ducks; _i < _a.length; _i++) {
            var duck = _a[_i];
            duck.update();
        }
    };
    Stage.prototype.renderLoop = function () {
        this.three.handleRender();
    };
    Stage.prototype.loop = function () {
        this.simulationLoop(0);
        this.renderLoop();
        this.updateGameObjects();
        requestAnimationFrame(this.loop.bind(this));
    };
    return Stage;
}());
exports.default = Stage;
