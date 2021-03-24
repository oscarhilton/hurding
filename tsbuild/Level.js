"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Segment = void 0;
var tiles_1 = __importDefault(require("./tiles"));
var Water_1 = __importDefault(require("./Tiles/Water"));
var Floor_1 = __importDefault(require("./Tiles/Floor"));
var Rock_1 = __importDefault(require("./Tiles/Rock"));
var Bridge_1 = __importDefault(require("./Tiles/Bridge"));
var Distraction_1 = __importDefault(require("./Tiles/Distraction"));
var NeighbourGrid_1 = __importDefault(require("./NeighbourGrid"));
var Duck_1 = __importDefault(require("./Duck"));
var Tile_1 = require("./Tiles/Tile");
var DistractionRadius_1 = __importDefault(require("./DistractionRadius"));
var Flock_1 = __importDefault(require("./Flock"));
var Segment = /** @class */ (function () {
    function Segment(map) {
        this.rows = map.split(',').map(function (row) {
            return row.split('').filter(function (character) { return Object.values(tiles_1.default).includes(character); });
        }).filter(function (array) { return array.length > 0; }).reverse();
    }
    return Segment;
}());
exports.Segment = Segment;
var Level = /** @class */ (function () {
    function Level(segments) {
        this.segmentsZ = segments;
        this.levelTiles = [];
        this.distractions = [];
        this.flock = null;
    }
    Level.prototype.returnNeighbouringTiles = function (xPosition, yPosition, zPosition, currentLevelTiles) {
        // For Z, Z + 1 & Z - 1:
        // [x - 1 & y + 1] [ x & y + 1 ] [+ x + 1 & y + 1]
        // [x - 1 & y    ] [   TILE!   ] [+ x + 1 & y    ]
        // [x - 1 & y - 1] [ x & y - 1 ] [+ x + 1 & y - 1]
        var zA = currentLevelTiles.segmentsZ[zPosition + 1] || null;
        var zC = currentLevelTiles.segmentsZ[zPosition] || null;
        var zB = currentLevelTiles.segmentsZ[zPosition - 1] || null;
        var findNeighbours = function (zLevel) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return new NeighbourGrid_1.default(((_a = zLevel.rows[yPosition - 1]) === null || _a === void 0 ? void 0 : _a[xPosition + 1]) || null, // TL
            ((_b = zLevel.rows[yPosition]) === null || _b === void 0 ? void 0 : _b[xPosition + 1]) || null, // TM
            ((_c = zLevel.rows[yPosition + 1]) === null || _c === void 0 ? void 0 : _c[xPosition + 1]) || null, // TR
            ((_d = zLevel.rows[yPosition - 1]) === null || _d === void 0 ? void 0 : _d[xPosition]) || null, // ML
            ((_e = zLevel.rows[yPosition]) === null || _e === void 0 ? void 0 : _e[xPosition]) || null, // MM
            ((_f = zLevel.rows[yPosition + 1]) === null || _f === void 0 ? void 0 : _f[xPosition]) || null, // MR
            ((_g = zLevel.rows[yPosition - 1]) === null || _g === void 0 ? void 0 : _g[xPosition - 1]) || null, // BL
            ((_h = zLevel.rows[yPosition]) === null || _h === void 0 ? void 0 : _h[xPosition - 1]) || null, // BM
            ((_j = zLevel.rows[yPosition + 1]) === null || _j === void 0 ? void 0 : _j[xPosition - 1]) || null);
        };
        return {
            layerAboveNeighbours: zA && zA.rows ? findNeighbours(zA) : null,
            layerCurrentNeighbours: zC && zC.rows ? findNeighbours(zC) : null,
            layerBelowNeighbours: zB && zB.rows ? findNeighbours(zB) : null,
        };
    };
    Level.prototype.setup = function (ducks, totalDucks, world, scene, three) {
        var cameraPosition = null;
        // run Z axis loop
        for (var z = 0; z < this.segmentsZ.length; z++) {
            var currentZ = this.segmentsZ[z];
            // run Y axis loop
            for (var y = 0; y < currentZ.rows.length; y++) {
                var currentY = currentZ.rows[y];
                // run X axis loop
                for (var x = 0; x < currentY.length; x++) {
                    var neighbouringTiles = this.returnNeighbouringTiles(x, y, z, this);
                    switch (currentY[x]) {
                        case tiles_1.default.water:
                            this.levelTiles.push(new Water_1.default(neighbouringTiles, x, y, z));
                            break;
                        case tiles_1.default.spawn:
                            // Update camera position variable
                            cameraPosition = { x: x * Tile_1.SIZE, y: y * Tile_1.SIZE };
                            // Add the ducks
                            if (totalDucks > 0) {
                                var columnDucks = 10 % totalDucks;
                                for (var col = 0; col < columnDucks; col++) {
                                    for (var row = 0; row < totalDucks / columnDucks; row++) {
                                        ducks.push(new Duck_1.default(world, scene, row * 1.1 + x * Tile_1.SIZE, col * 1.1 + y * Tile_1.SIZE));
                                    }
                                }
                                this.flock = new Flock_1.default(ducks);
                            }
                        case tiles_1.default.floor:
                            this.levelTiles.push(new Floor_1.default(neighbouringTiles, x, y, z));
                            break;
                        case tiles_1.default.rock:
                            this.levelTiles.push(new Rock_1.default(neighbouringTiles, x, y, z));
                            this.distractions.push(new DistractionRadius_1.default(ducks, x * Tile_1.SIZE, y * Tile_1.SIZE, z * Tile_1.SIZE, false, 2, 0.1));
                            break;
                        case tiles_1.default.bridge:
                            this.levelTiles.push(new Bridge_1.default(neighbouringTiles, x, y, z));
                            break;
                        case tiles_1.default.distraction:
                            this.levelTiles.push(new Distraction_1.default(neighbouringTiles, x, y, z));
                            this.distractions.push(new DistractionRadius_1.default(ducks, x * Tile_1.SIZE, y * Tile_1.SIZE, z * Tile_1.SIZE, false, 20));
                            break;
                        default:
                            continue;
                    }
                }
            }
        }
        if (cameraPosition) {
            three.updateCamera(cameraPosition);
        }
        for (var _i = 0, _a = this.levelTiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            tile.setup(world, scene);
        }
    };
    Level.prototype.update = function (scene, ducks) {
        if (this.distractions.length > 0) {
            for (var _i = 0, _a = this.distractions; _i < _a.length; _i++) {
                var distraction = _a[_i];
                distraction.update(scene);
            }
        }
        if (this.flock !== null) {
            // this.flock.update();
        }
        for (var _b = 0, ducks_1 = ducks; _b < ducks_1.length; _b++) {
            var duck = ducks_1[_b];
            duck.update();
        }
        return;
    };
    return Level;
}());
exports.default = Level;
