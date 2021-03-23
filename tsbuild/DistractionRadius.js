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
    }
    DestractionRadius.prototype.update = function () {
        for (var _i = 0, _a = this.distractBodies; _i < _a.length; _i++) {
            var myAgent = _a[_i];
            debugger;
            var distractionInstance = this;
            var distractionAmount = distractionInstance.computeDistractionAmount(myAgent);
            myAgent.body.velocity.x = distractionAmount.x;
            myAgent.body.velocity.y = distractionAmount.y;
            var oldZ = myAgent.body.velocity.z;
            myAgent.body.velocity.normalize(AGENT_SPEED);
            myAgent.body.velocity.z = oldZ;
            return;
        }
    };
    DestractionRadius.prototype.computeDistractionAmount = function (myAgent) {
        var agentToPoint = new cannon_1.Vec3();
        agentToPoint = myAgent.body.position.negate(agentToPoint);
        var distance = agentToPoint.norm();
        agentToPoint.normalize();
        agentToPoint.mult(1500 / Math.pow(distance, 2), new cannon_1.Vec3(this.strength, this.strength, this.strength));
        if (this.inverse) {
            agentToPoint.x *= -1;
            agentToPoint.y *= -1;
        }
        return agentToPoint;
    };
    return DestractionRadius;
}());
exports.default = DestractionRadius;
