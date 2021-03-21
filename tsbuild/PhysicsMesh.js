"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhysicsMesh = /** @class */ (function () {
    function PhysicsMesh(world, scene) {
        this.world = world;
        this.scene = scene;
        this.body = null;
        this.mesh = null;
    }
    PhysicsMesh.prototype.update = function () {
        this.mesh.position.x = this.body.position.x;
        this.mesh.position.y = this.body.position.y;
        this.mesh.position.z = this.body.position.z;
        this.mesh.quaternion.x = this.body.quaternion.x;
        this.mesh.quaternion.y = this.body.quaternion.y;
        this.mesh.quaternion.z = this.body.quaternion.z;
        this.mesh.quaternion.w = this.body.quaternion.w;
    };
    PhysicsMesh.prototype.run = function () {
        this.update();
    };
    return PhysicsMesh;
}());
exports.default = PhysicsMesh;
