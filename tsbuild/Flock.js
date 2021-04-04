"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cannon_1 = require("cannon");
var DISTANCE_FROM_NEIGHBOUR = 10;
var Flock = /** @class */ (function () {
    function Flock(flockBodies) {
        this.flockBodies = flockBodies;
    }
    Flock.prototype.update = function () {
        for (var _i = 0, _a = this.flockBodies; _i < _a.length; _i++) {
            var myAgent = _a[_i];
            var alignment = this.computeAlignment(myAgent);
            var cohesion = this.computeCohesion(myAgent);
            var separation = this.computeSeparation(myAgent);
            var force = new cannon_1.Vec3(alignment.x + cohesion.x + separation.x, alignment.y + cohesion.y + separation.y, alignment.z + cohesion.z + separation.z);
            force.mult(0.5);
            myAgent.addForce(force);
        }
        return;
    };
    // Alignment is a behavior that causes a particular agent to line up with agents close by.
    Flock.prototype.computeAlignment = function (myAgent) {
        var point = new cannon_1.Vec3();
        var neighbors = 0;
        for (var _i = 0, _a = this.flockBodies; _i < _a.length; _i++) {
            var agent = _a[_i];
            if (myAgent !== agent) {
                var distance = myAgent.body.position.distanceTo(agent.body.position);
                if (distance < DISTANCE_FROM_NEIGHBOUR) {
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
            return point;
        }
    };
    // Cohesion is a behavior that causes agents to steer towards the "center of mass"
    Flock.prototype.computeCohesion = function (myAgent) {
        var point = new cannon_1.Vec3();
        var neighbors = 0;
        for (var _i = 0, _a = this.flockBodies; _i < _a.length; _i++) {
            var agent = _a[_i];
            if (myAgent !== agent) {
                var distance = myAgent.body.position.distanceTo(agent.body.position);
                if (distance < DISTANCE_FROM_NEIGHBOUR) {
                    point.x += agent.body.position.x;
                    point.y += agent.body.position.y;
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
            point = new cannon_1.Vec3(point.x - myAgent.body.position.x, point.y - myAgent.body.position.y, point.z);
            point.normalize();
            return point;
        }
    };
    // Separation is the behavior that causes an agent to steer away from all of its neighbors.
    Flock.prototype.computeSeparation = function (myAgent) {
        var point = new cannon_1.Vec3();
        var neighbors = 0;
        for (var _i = 0, _a = this.flockBodies; _i < _a.length; _i++) {
            var agent = _a[_i];
            if (myAgent !== agent) {
                var distance = myAgent.body.position.distanceTo(agent.body.position);
                if (distance < DISTANCE_FROM_NEIGHBOUR) {
                    point.x += agent.body.position.x - myAgent.body.position.x;
                    point.y += agent.body.position.y - myAgent.body.position.y;
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
            point.x *= -1;
            point.y *= -1;
            point.normalize();
            return point;
        }
    };
    return Flock;
}());
exports.default = Flock;
