"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cannon_1 = require("cannon");
var PhysicsMesh = /** @class */ (function () {
    function PhysicsMesh() {
        this.body = null;
        this.mesh = null;
        // Forces
        this.forces = [];
    }
    PhysicsMesh.prototype.setup = function (scene, world) {
        if (this.body) {
            this.body.addEventListener("collide", this.handleCollisions.bind(this));
        }
    };
    PhysicsMesh.prototype.addForce = function (force) {
        this.forces.push(force);
    };
    PhysicsMesh.prototype.update = function () {
        if (this.forces.length > 0) {
            var accumForce = this.forces.reduce(function (totalForce, currentForce) {
                var newForce = new cannon_1.Vec3(0, 0, 0);
                totalForce.vadd(currentForce, newForce);
                return newForce;
            }, new cannon_1.Vec3(0, 0, 0));
            accumForce.normalize();
            this.body.velocity.x = accumForce.x * 4;
            this.body.velocity.y = accumForce.y * 4;
            this.forces = [];
        }
        this.mesh.position.x = this.body.position.x;
        this.mesh.position.y = this.body.position.y;
        this.mesh.position.z = this.body.position.z;
        this.mesh.quaternion.x = this.body.quaternion.x;
        this.mesh.quaternion.y = this.body.quaternion.y;
        this.mesh.quaternion.z = this.body.quaternion.z;
        this.mesh.quaternion.w = this.body.quaternion.w;
        return;
    };
    PhysicsMesh.prototype.handleCollisions = function () {
        // Handle collisions here
    };
    return PhysicsMesh;
}());
exports.default = PhysicsMesh;
