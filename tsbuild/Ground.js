"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cannon_1 = require("cannon");
var three_1 = require("three");
var Ground = /** @class */ (function () {
    function Ground(world, scene) {
        // Physics constructor
        this.world = world;
        this.BODY = new cannon_1.Body({
            mass: 0,
            type: cannon_1.Body.KINEMATIC,
            position: new cannon_1.Vec3(0, 0, 0),
        });
        this.SHAPE = new cannon_1.Plane();
        // Geometry constructor
        this.scene = scene;
        this.GEOMETRY = new three_1.PlaneGeometry(100, 100, 32);
        this.MATERIAL = new three_1.MeshToonMaterial({ color: 0xffff00, side: three_1.DoubleSide });
        this.MESH = new three_1.Mesh(this.GEOMETRY, this.MATERIAL);
    }
    Ground.prototype.setup = function () {
        this.BODY.addShape(this.SHAPE);
        this.world.addBody(this.BODY);
        this.scene.add(this.MESH);
        this.MESH.position.x = this.BODY.position.x;
        this.MESH.position.y = this.BODY.position.y;
        this.MESH.position.z = this.BODY.position.z;
        this.MESH.quaternion.x = this.BODY.quaternion.x;
        this.MESH.quaternion.y = this.BODY.quaternion.y;
        this.MESH.quaternion.z = this.BODY.quaternion.z;
        this.MESH.quaternion.w = this.BODY.quaternion.w;
    };
    return Ground;
}());
exports.default = Ground;
