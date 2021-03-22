"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cannon_1 = require("cannon");
var Flock = /** @class */ (function () {
    function Flock(flockBodies) {
        this.flockBodies = flockBodies;
    }
    Flock.prototype.update = function () {
        for (var _i = 0, _a = this.flockBodies; _i < _a.length; _i++) {
            var myAgent = _a[_i];
            this.computeAlignment(myAgent);
        }
    };
    Flock.prototype.computeAlignment = function (myAgent) {
        var point = new cannon_1.Vec3();
        var neighbors = 0;
        for (var _i = 0, _a = this.flockBodies; _i < _a.length; _i++) {
            var agent = _a[_i];
            if (myAgent !== agent) {
                var distance = myAgent.body.position.distanceTo(agent.body.position);
                if (distance < 300) {
                    point.x += agent.body.velocity.x;
                    point.y += agent.body.velocity.y;
                    neighbors++;
                }
            }
        }
        if (neighbors === 0) {
            return point;
        }
        else {
            point.x = point.x / neighbors;
            point.y = point.y / neighbors;
            point.normalize();
            console.log(point);
            return point;
        }
    };
    return Flock;
}());
exports.default = Flock;
// Alignment
// Alignment is a behavior that causes a particular agent to line up with agents close by.
// Cohesion
// The implementation is almost identical to that of the alignment behavior, but there are some key differences. First, instead of adding the velocity to the computation vector, the position is added instead.
// Separation
// The implementation of separation is very similar to that of alignment and cohesion, so I'll only point out what is different. When a neighboring agent is found, the distance from the agent to the neighbor is added to the computation vector.
