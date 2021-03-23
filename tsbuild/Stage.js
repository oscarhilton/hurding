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
var Rock_1 = __importDefault(require("./Tiles/Rock"));
var Bridge_1 = __importDefault(require("./Tiles/Bridge"));
var Distraction_1 = __importDefault(require("./Tiles/Distraction"));
var Flock_1 = __importDefault(require("./Flock"));
var DistractionRadius_1 = __importDefault(require("./DistractionRadius"));
var GRAVITY = -9.82; // real world gravity;
var Stage = /** @class */ (function () {
    function Stage() {
        // Set up THREE
        this.three = new ThreeInstance_1.default();
        // Create the world
        this.world = new cannon_1.World();
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
    Stage.prototype.setupThree = function () {
        console.log("SETTING UP THREE");
        this.three.setup();
    };
    Stage.prototype.setupGame = function () {
        console.log("SETTING UP GAME");
        // Set the gravity
        this.world.gravity.set(0, 0, GRAVITY);
        // Set up all the ducks
        for (var _i = 0, _a = this.ducks; _i < _a.length; _i++) {
            var duck = _a[_i];
            duck.setup();
        }
        // Run the loop
        this.loop();
    };
    Stage.prototype.setupCurrentLevel = function () {
        var cameraPosition = null;
        var level = Levels_1.default[this.currentLevelIndex];
        // run Z axis loop
        for (var z = 0; z < level.segmentsZ.length; z++) {
            var currentZ = level.segmentsZ[z];
            // run Y axis loop
            for (var y = 0; y < currentZ.rows.length; y++) {
                var currentY = currentZ.rows[y];
                // run X axis loop
                for (var x = 0; x < currentY.length; x++) {
                    switch (currentY[x]) {
                        case tiles_1.default.water:
                            this.levelTiles.push(new Water_1.default(x, y, z));
                            break;
                        case tiles_1.default.spawn:
                            // Update camera position variable
                            cameraPosition = { x: x * Tile_1.SIZE, y: y * Tile_1.SIZE };
                            // Add the ducks
                            if (this.totalDucks > 0) {
                                var columnDucks = 10 % this.totalDucks;
                                for (var col = 0; col < columnDucks; col++) {
                                    for (var row = 0; row < this.totalDucks / columnDucks; row++) {
                                        this.ducks.push(new Duck_1.default(this.world, this.three.scene, row * 1.1 + x * Tile_1.SIZE, col * 1.1 + y * Tile_1.SIZE));
                                    }
                                }
                                this.flock = new Flock_1.default(this.ducks);
                            }
                        case tiles_1.default.floor:
                            this.levelTiles.push(new Floor_1.default(x, y, z));
                            break;
                        case tiles_1.default.rock:
                            this.levelTiles.push(new Rock_1.default(x, y, z));
                            this.distractions.push(new DistractionRadius_1.default(this.ducks, x * Tile_1.SIZE, y * Tile_1.SIZE, z * Tile_1.SIZE, false, 2, 0.1));
                            break;
                        case tiles_1.default.bridge:
                            this.levelTiles.push(new Bridge_1.default(x, y, z));
                            break;
                        case tiles_1.default.distraction:
                            this.levelTiles.push(new Distraction_1.default(x, y, z));
                            this.distractions.push(new DistractionRadius_1.default(this.ducks, x * Tile_1.SIZE, y * Tile_1.SIZE, z * Tile_1.SIZE, false, 20));
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
        for (var _i = 0, _a = this.levelTiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            tile.setup(this.world, this.three.scene);
        }
        // Set the game
        this.setupGame();
    };
    Stage.prototype.simulationLoop = function (time) {
        var dt = (time - this.clock) / 1000;
        this.world.step(this.fixedTimeStep, dt, this.maxSubSteps);
        return this.clock = time;
    };
    Stage.prototype.updateGameObjects = function () {
        if (this.distractions.length > 0) {
            for (var _i = 0, _a = this.distractions; _i < _a.length; _i++) {
                var distraction = _a[_i];
                distraction.update();
            }
        }
        if (this.flock !== null) {
            // this.flock.update();
        }
        for (var _b = 0, _c = this.ducks; _b < _c.length; _b++) {
            var duck = _c[_b];
            duck.update();
        }
        return;
    };
    Stage.prototype.renderLoop = function () {
        return this.three.handleRender();
    };
    Stage.prototype.loop = function () {
        requestAnimationFrame(this.loop.bind(this));
        this.simulationLoop(0);
        this.updateGameObjects();
        this.renderLoop();
    };
    return Stage;
}());
exports.default = Stage;
