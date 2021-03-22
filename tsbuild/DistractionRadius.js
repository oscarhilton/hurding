"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cannon_1 = require("cannon");
var AGENT_SPEED = 100;
var DISTANCE_FROM_DISTRACTOR = 300;
var DestractionRadius = /** @class */ (function () {
    function DestractionRadius(distractBodies, x, y, z, inverse, strength, distance) {
        this.distractBodies = distractBodies;
        this.distractOrigin = new cannon_1.Vec3(x, y, z);
        this.inverse = inverse;
        this.distance = distance || DISTANCE_FROM_DISTRACTOR;
        this.strength = strength || 1;
        console.log(this.inverse, "<<<<<");
    }
    DestractionRadius.prototype.update = function () {
        for (var _i = 0, _a = this.distractBodies; _i < _a.length; _i++) {
            var myAgent = _a[_i];
            var distractionAmount = this.computeDistractionAmount(myAgent);
            myAgent.body.velocity.x = distractionAmount.x * this.strength;
            myAgent.body.velocity.y = distractionAmount.y * this.strength;
            var oldZ = myAgent.body.velocity.z;
            myAgent.body.velocity.normalize(AGENT_SPEED);
            myAgent.body.velocity.z = oldZ;
        }
    };
    DestractionRadius.prototype.computeDistractionAmount = function (myAgent) {
        var point = new cannon_1.Vec3();
        var distractedCount = 0;
        var distance = myAgent.body.position.distanceTo(this.distractOrigin);
        if (distance < DISTANCE_FROM_DISTRACTOR) {
            point.x += myAgent.body.position.x - this.distractOrigin.x;
            point.y += myAgent.body.position.y - this.distractOrigin.y;
            if (this.inverse) {
                point.x *= -1;
                point.y *= -1;
            }
            distractedCount++;
        }
        console.log(point);
        return point;
    };
    return DestractionRadius;
}());
exports.default = DestractionRadius;
