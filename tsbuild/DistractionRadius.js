"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cannon_1 = require("cannon");
var Gizmo_1 = __importDefault(require("./Gizmo"));
var Tile_1 = require("./Tiles/Tile");
var AGENT_SPEED = 100;
var DISTANCE_FROM_DISTRACTOR = 300;
var DestractionRadius = /** @class */ (function () {
    function DestractionRadius(distractBodies, x, y, z, inverse, strength, distance) {
        this.distractBodies = distractBodies;
        this.distractOrigin = new cannon_1.Vec3(x, y, z).mult(Tile_1.SIZE);
        this.inverse = inverse;
        this.distance = distance || DISTANCE_FROM_DISTRACTOR;
        this.strength = strength || 1;
        console.log(this.distractOrigin);
    }
    DestractionRadius.prototype.update = function (scene) {
        for (var _i = 0, _a = this.distractBodies; _i < _a.length; _i++) {
            var myAgent = _a[_i];
            var distractionAmount = this.computeDistractionAmount(myAgent);
            myAgent.body.velocity.x = distractionAmount.x;
            myAgent.body.velocity.y = distractionAmount.y;
            var oldZ = myAgent.body.velocity.z;
            myAgent.body.velocity.z = oldZ;
        }
        new Gizmo_1.default(0xFF0000, scene, this.distractOrigin.x, this.distractOrigin.y, this.distractOrigin.z);
        return;
    };
    DestractionRadius.prototype.computeDistractionAmount = function (myAgent) {
        var attracton = myAgent.body.position.negate(this.distractOrigin);
        var distance = this.distractOrigin.distanceTo(myAgent.body.position);
        attracton.normalize();
        attracton.mult(1500 / Math.pow(distance, 2), new cannon_1.Vec3(10, 10, 10));
        attracton.mult(Tile_1.SIZE);
        if (this.inverse) {
            attracton.x *= -1;
            attracton.y *= -1;
        }
        return attracton;
    };
    return DestractionRadius;
}());
exports.default = DestractionRadius;
