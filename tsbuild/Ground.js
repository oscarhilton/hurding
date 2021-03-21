"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cannon_1 = require("cannon");
var three_1 = require("three");
var Ground = /** @class */ (function () {
    function Ground(world, scene) {
        // Physics constructor
        this.world = world;
        this.body = new cannon_1.Body({
            mass: 0,
            type: cannon_1.Body.KINEMATIC,
            position: new cannon_1.Vec3(0, 0, 0),
        });
        this.shape = new cannon_1.Plane();
        // Geometry constructor
        this.scene = scene;
        this.geometry = new three_1.PlaneGeometry(100, 100, 32);
        this.material = new three_1.MeshToonMaterial({ color: 0xffff00, side: three_1.DoubleSide });
        this.mesh = new three_1.Mesh(this.geometry, this.material);
    }
    Ground.prototype.setup = function () {
        this.body.addShape(this.shape);
        this.world.addBody(this.body);
        this.scene.add(this.mesh);
        this.mesh.position.x = this.body.position.x;
        this.mesh.position.y = this.body.position.y;
        this.mesh.position.z = this.body.position.z;
        this.mesh.quaternion.x = this.body.quaternion.x;
        this.mesh.quaternion.y = this.body.quaternion.y;
        this.mesh.quaternion.z = this.body.quaternion.z;
        this.mesh.quaternion.w = this.body.quaternion.w;
    };
    return Ground;
}());
exports.default = Ground;
