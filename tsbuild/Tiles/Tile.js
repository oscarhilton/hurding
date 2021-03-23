"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIZE = void 0;
var three_1 = require("three");
var cannon_1 = require("cannon");
exports.SIZE = 8;
var Tile = /** @class */ (function () {
    function Tile(neighbouringTiles, killsDucks, colour, x, y, z, texture) {
        this.neighbouringTiles = neighbouringTiles;
        this.killsDucks = killsDucks;
        // Physics constructor
        this.halfExtents = new cannon_1.Vec3(exports.SIZE / 2, exports.SIZE / 2, exports.SIZE / 2);
        this.shape = new cannon_1.Box(this.halfExtents);
        this.body = new cannon_1.Body({
            mass: 0,
            position: new cannon_1.Vec3(x * exports.SIZE, y * exports.SIZE, z * exports.SIZE),
        });
        // Geometry constructor
        this.geometry = new three_1.BoxGeometry(exports.SIZE, exports.SIZE, exports.SIZE);
        this.material = new three_1.MeshPhongMaterial({ color: colour, map: texture });
        this.mesh = new three_1.Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.position.set(x * exports.SIZE, y * exports.SIZE, z * exports.SIZE);
    }
    Tile.prototype.setup = function (world, scene) {
        this.body.addShape(this.shape);
        world.addBody(this.body);
        scene.add(this.mesh);
    };
    return Tile;
}());
exports.default = Tile;
