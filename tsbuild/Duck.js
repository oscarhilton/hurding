"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("three");
var cannon_1 = require("cannon");
var PhysicsMesh_1 = __importDefault(require("./PhysicsMesh"));
var DEFAULT_SIZE = 1;
var DEFAULT_MASS = 50;
var Duck = /** @class */ (function (_super) {
    __extends(Duck, _super);
    function Duck(x, y, z) {
        var _this = _super.call(this) || this;
        // Charactoristics constructor
        _this.isAlive = true;
        // Physics constructor
        _this.halfExtents = new cannon_1.Vec3(DEFAULT_SIZE / 2, DEFAULT_SIZE / 2, DEFAULT_SIZE / 2);
        _this.shape = new cannon_1.Box(_this.halfExtents);
        _this.body = new cannon_1.Body({
            mass: DEFAULT_MASS,
            position: new cannon_1.Vec3(x, y, 10 + z),
        });
        _this.vehicle = new cannon_1.RigidVehicle({ chassisBody: _this.body });
        var oldZ = _this.body.position.z;
        _this.body.position.mult(8, _this.body.position);
        _this.body.position.z = oldZ;
        // Geometry constructor
        _this.geometry = new three_1.BoxGeometry(DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE);
        _this.material = new three_1.MeshPhongMaterial({ color: 0xFF8000 });
        _this.mesh = new three_1.Mesh(_this.geometry, _this.material);
        _this.mesh.castShadow = true;
        return _this;
    }
    Duck.prototype.setup = function (scene, world) {
        this.body.addShape(this.shape);
        world.addBody(this.body);
        scene.add(this.mesh);
        _super.prototype.setup.call(this, scene, world);
        return;
    };
    Duck.prototype.giveRandomInpulse = function () {
        var x = 2 * Math.random() - 1;
        var y = 2 * Math.random() - 1;
        var z = 2 * Math.random() - 1;
        var randomVector = new cannon_1.Vec3(x, y, z).mult(10);
        _super.prototype.addForce.call(this, randomVector);
    };
    Duck.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.isAlive) {
            this.giveRandomInpulse();
        }
        else {
            console.log("duck is dead");
        }
        return;
    };
    Duck.prototype.kill = function () {
        return this.isAlive = false;
    };
    return Duck;
}(PhysicsMesh_1.default));
exports.default = Duck;
