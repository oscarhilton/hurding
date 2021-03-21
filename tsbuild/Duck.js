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
var DEFAULT_MASS = 5;
var Duck = /** @class */ (function (_super) {
    __extends(Duck, _super);
    function Duck(world, scene, x, y) {
        var _this = _super.call(this, world, scene) || this;
        // Physics constructor
        _this.size = DEFAULT_SIZE;
        _this.halfExtents = new cannon_1.Vec3(_this.size / 2, _this.size / 2, _this.size / 2);
        _this.shape = new cannon_1.Box(_this.halfExtents);
        _this.body = new cannon_1.Body({
            mass: DEFAULT_MASS,
            position: new cannon_1.Vec3(x, y, 10),
        });
        // Geometry constructor
        _this.geometry = new three_1.BoxGeometry(DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE);
        _this.material = new three_1.MeshToonMaterial({ color: 0xFF8000 });
        _this.mesh = new three_1.Mesh(_this.geometry, _this.material);
        _this.setup();
        return _this;
    }
    Duck.prototype.setup = function () {
        this.body.addShape(this.shape);
        this.world.addBody(this.body);
        this.scene.add(this.mesh);
        _super.prototype.run.call(this);
    };
    return Duck;
}(PhysicsMesh_1.default));
exports.default = Duck;
