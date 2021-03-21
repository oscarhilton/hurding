"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIZE = void 0;
var three_1 = require("three");
var cannon_1 = require("cannon");
exports.SIZE = 2;
var Tile = /** @class */ (function () {
    function Tile(killsDucks, colour, x, y, z) {
        this.killsDucks = killsDucks;
        // Physics constructor
        this.halfExtents = new cannon_1.Vec3(exports.SIZE / 2, exports.SIZE / 2, exports.SIZE / 2);
        this.shape = new cannon_1.Box(this.halfExtents);
        this.body = new cannon_1.Body({
            mass: 0,
            position: new cannon_1.Vec3(x, y, z),
        });
        // Geometry constructor
        this.geometry = new three_1.BoxGeometry(exports.SIZE, exports.SIZE, exports.SIZE);
        this.material = new three_1.MeshToonMaterial({ color: colour });
        this.mesh = new three_1.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y, z);
    }
    Tile.prototype.setup = function (world, scene) {
        this.body.addShape(this.shape);
        world.addBody(this.body);
        scene.add(this.mesh);
    };
    return Tile;
}());
exports.default = Tile;