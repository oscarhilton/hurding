"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cannon_1 = require("cannon");
var Player = /** @class */ (function () {
    function Player(x, y, z) {
        var centerOfMassAdjust = new cannon_1.Vec3(0, 0, -1);
        var chassisShape = new cannon_1.Box(new cannon_1.Vec3(5, 2, 0.5));
        var chassisBody = new cannon_1.Body({ mass: 1 });
        chassisBody.addShape(chassisShape, centerOfMassAdjust);
        chassisBody.position.set(0, 0, 0);
        // Create the vehicle
        this.vehicle = new cannon_1.RigidVehicle({ chassisBody: chassisBody });
        var axisWidth = 7;
        var wheelShape = new cannon_1.Sphere(1.5);
        var down = new cannon_1.Vec3(0, 0, -1);
        var wheelBody = new cannon_1.Body({ mass: 10 });
        wheelBody.addShape(wheelShape);
        this.vehicle.addWheel({
            body: wheelBody,
            position: new cannon_1.Vec3(5, axisWidth / 2, 0).vadd(centerOfMassAdjust),
            axis: new cannon_1.Vec3(0, 1, 0),
            direction: down
        });
        var wheelBody = new cannon_1.Body({ mass: 10 });
        wheelBody.addShape(wheelShape);
        this.vehicle.addWheel({
            body: wheelBody,
            position: new cannon_1.Vec3(5, -axisWidth / 2, 0).vadd(centerOfMassAdjust),
            axis: new cannon_1.Vec3(0, -1, 0),
            direction: down
        });
        var wheelBody = new cannon_1.Body({ mass: 10 });
        wheelBody.addShape(wheelShape);
        this.vehicle.addWheel({
            body: wheelBody,
            position: new cannon_1.Vec3(-5, axisWidth / 2, 0).vadd(centerOfMassAdjust),
            axis: new cannon_1.Vec3(0, 1, 0),
            direction: down
        });
        var wheelBody = new cannon_1.Body({ mass: 10 });
        wheelBody.addShape(wheelShape);
        this.vehicle.addWheel({
            body: wheelBody,
            position: new cannon_1.Vec3(-5, -axisWidth / 2, 0).vadd(centerOfMassAdjust),
            axis: new cannon_1.Vec3(0, -1, 0),
            direction: down
        });
        // Some damping to not spin wheels too fast
        for (var i = 0; i < this.vehicle.wheelBodies.length; i++) {
            this.vehicle.wheelBodies[i].angularDamping = 0.4;
        }
    }
    Player.prototype.setup = function () {
    };
    Player.prototype.handler = function (event) {
        var up = (event.type == 'keyup');
        if (!up && event.type !== 'keydown')
            return;
        switch (event.keyCode) {
            case 38: // forward
                this.vehicle.setWheelForce(up ? 0 : maxForce, 2);
                this.vehicle.setWheelForce(up ? 0 : -maxForce, 3);
                break;
            case 40: // backward
                this.vehicle.setWheelForce(up ? 0 : -maxForce / 2, 2);
                this.vehicle.setWheelForce(up ? 0 : maxForce / 2, 3);
                break;
            case 39: // right
                this.vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 0);
                this.vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 1);
                break;
            case 37: // left
                this.vehicle.setSteeringValue(up ? 0 : maxSteerVal, 0);
                this.vehicle.setSteeringValue(up ? 0 : maxSteerVal, 1);
                break;
        }
    };
    return Player;
}());
exports.default = Player;
;
var maxSteerVal = Math.PI / 8;
var maxSpeed = 10;
var maxForce = 100;
