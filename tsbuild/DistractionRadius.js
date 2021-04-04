"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cannon_1 = require("cannon");
// import Gizmo from "./Gizmo";
var Tile_1 = require("./Tiles/Tile");
var DISTANCE_FROM_DISTRACTOR = 300;
var ATTRACTION_DISTANCE = 200;
var DestractionRadius = /** @class */ (function () {
    function DestractionRadius(distractBodies, x, y, z, inverse, multiplier, distance) {
        this.distractBodies = distractBodies;
        this.distractOrigin = new cannon_1.Vec3(x * Tile_1.SIZE, y * Tile_1.SIZE, z * Tile_1.SIZE);
        this.inverse = inverse;
        this.distance = distance || DISTANCE_FROM_DISTRACTOR;
        this.multiplier = multiplier || 1;
    }
    // update(scene: Scene) {
    //   for (var myAgent of this.distractBodies) {
    //     const force = this.computeDistractionAmount(myAgent);
    //   }
    //   // new Gizmo(0xFF0000, scene, this.distractOrigin.x, this.distractOrigin.y, this.distractOrigin.z);
    //   return;
    // }
    DestractionRadius.prototype.computeDistractionAmount = function (myAgent) {
        // What is the forces direction?
        var force = new cannon_1.Vec3();
        this.distractOrigin.vsub(myAgent.body.position, force);
        // const angle = new Vec3();
        // const copy = myAgent.body.quaternion.copy();
        // copy.toAxisAngle(this.distractOrigin, angle);
        // console.log(angle);
        // const normAgent = myAgent.body.position.normalize();
        // const normOrigin = this.distractOrigin.normalize();
        console.log(myAgent.body.position.dot(this.distractOrigin));
        var isInFieldOfView = true;
        // What is the distance?
        var distance = force.norm();
        if (distance < ATTRACTION_DISTANCE && isInFieldOfView) { // If the distance is less than X amount
            // Normalize the force
            force.normalize();
            // Make the strength
            var strength = (this.multiplier * myAgent.body.mass) / (distance < 0 ? Math.pow(distance, 2) : 0.0001);
            // Multply the force by the strength
            force.mult(strength);
            if (this.inverse) {
                force.mult(-1);
            }
            return myAgent.addForce(force);
        }
        else {
            return;
        }
    };
    return DestractionRadius;
}());
exports.default = DestractionRadius;
