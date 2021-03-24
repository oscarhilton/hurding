"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIZE = void 0;
var three_1 = require("three");
var cannon_1 = require("cannon");
var tiles_1 = __importDefault(require("../tiles"));
var LoadTexture_1 = __importDefault(require("../textures/LoadTexture"));
var Gizmo_1 = __importDefault(require("../Gizmo"));
exports.SIZE = 8;
var DONT_SHOW_FACE = new three_1.MeshBasicMaterial({ visible: false });
var Tile = /** @class */ (function () {
    function Tile(neighbouringTiles, killsDucks, x, y, z) {
        var faces = {
            one: DONT_SHOW_FACE,
            two: DONT_SHOW_FACE,
            three: DONT_SHOW_FACE,
            four: DONT_SHOW_FACE,
            five: DONT_SHOW_FACE,
            six: DONT_SHOW_FACE,
        };
        var top = new three_1.MeshPhongMaterial({ opacity: 0.5, map: LoadTexture_1.default("/textures/sea/baseSea.png") });
        var blue = new three_1.MeshPhongMaterial({ opacity: 0.5, color: 0xffff00 });
        if (neighbouringTiles) {
            // as a die, 1 on top, 6 on bottom.
            var layerCurrentNeighbours = neighbouringTiles.layerCurrentNeighbours, layerAboveNeighbours = neighbouringTiles.layerAboveNeighbours, layerBelowNeighbours = neighbouringTiles.layerBelowNeighbours;
            if (!layerBelowNeighbours &&
                (layerAboveNeighbours === null || layerAboveNeighbours === void 0 ? void 0 : layerAboveNeighbours.TM) === tiles_1.default.nothing || null) {
                faces.one = top;
            }
            if (layerBelowNeighbours === null) {
                faces.six = blue; // CORRECT
            }
            if (layerCurrentNeighbours) {
                if (layerCurrentNeighbours.ML === null &&
                    layerCurrentNeighbours.MR === tiles_1.default.nothing || null) {
                    faces.three = blue; // CORRECT
                }
                if (layerCurrentNeighbours.MR === null &&
                    layerCurrentNeighbours.ML === tiles_1.default.nothing || null) {
                    faces.two = blue; // CORRECT
                }
                if (layerCurrentNeighbours.BM === null &&
                    layerCurrentNeighbours.TM === null) {
                    faces.four = blue;
                }
                if (layerCurrentNeighbours.TM === null &&
                    layerCurrentNeighbours.BM === null) {
                    faces.five = blue;
                }
            }
        }
        var material = [
            faces.two,
            faces.three,
            faces.four,
            faces.five,
            faces.one,
            faces.six, // BOTTOM
        ];
        this.killsDucks = killsDucks;
        this.x = x;
        this.y = y;
        this.z = z;
        // Physics constructor
        this.halfExtents = new cannon_1.Vec3(exports.SIZE / 2, exports.SIZE / 2, exports.SIZE / 2);
        this.shape = new cannon_1.Box(this.halfExtents);
        this.body = new cannon_1.Body({
            mass: 0,
            position: new cannon_1.Vec3(x * exports.SIZE, y * exports.SIZE, z * exports.SIZE),
        });
        // Geometry constructor
        this.geometry = new three_1.BoxGeometry(exports.SIZE, exports.SIZE, exports.SIZE);
        this.mesh = new three_1.Mesh(this.geometry, material);
        this.mesh.castShadow = true;
        this.mesh.position.set(x * exports.SIZE, y * exports.SIZE, z * exports.SIZE);
    }
    Tile.prototype.setup = function (world, scene) {
        this.body.addShape(this.shape);
        world.addBody(this.body);
        scene.add(this.mesh);
        new Gizmo_1.default(0x00ff00, scene, this.x * exports.SIZE, this.y * exports.SIZE, this.z * exports.SIZE);
    };
    return Tile;
}());
exports.default = Tile;
