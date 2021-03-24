"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("three");
var Gizmo = /** @class */ (function () {
    function Gizmo(scene, x, y, z) {
        this.geometry = new three_1.BoxGeometry(1, 1, 1);
        this.material = new three_1.MeshBasicMaterial({ color: 0x00ff00 });
        this.mesh = new three_1.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y, z);
        scene.add(this.mesh);
    }
    return Gizmo;
}());
exports.default = Gizmo;
