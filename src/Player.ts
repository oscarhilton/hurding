import { Vec3, Box, Sphere, Body, RigidVehicle } from "cannon";

export default class Player {
  vehicle: RigidVehicle;

  constructor (x: number, y: number, z: number) {
    const centerOfMassAdjust = new Vec3(0, 0, -1);
    const chassisShape = new Box(new Vec3(5, 2, 0.5));
    const chassisBody = new Body({ mass: 1 });
    chassisBody.addShape(chassisShape, centerOfMassAdjust);
    chassisBody.position.set(0, 0, 0);

    // Create the vehicle
    this.vehicle = new RigidVehicle({ chassisBody: chassisBody });

    var axisWidth = 7;
    var wheelShape = new Sphere(1.5);
    var down = new Vec3(0, 0, -1);

    var wheelBody = new Body({ mass: 10 });
    wheelBody.addShape(wheelShape);

    this.vehicle.addWheel({
        body: wheelBody,
        position: new Vec3(5, axisWidth/2, 0).vadd(centerOfMassAdjust),
        axis: new Vec3(0, 1, 0),
        direction: down
    });

    var wheelBody = new Body({ mass: 10 });
    wheelBody.addShape(wheelShape);
    this.vehicle.addWheel({
        body: wheelBody,
        position: new Vec3(5, -axisWidth/2, 0).vadd(centerOfMassAdjust),
        axis: new Vec3(0, -1, 0),
        direction: down
    });

    var wheelBody = new Body({ mass: 10 });
    wheelBody.addShape(wheelShape);
    this.vehicle.addWheel({
        body: wheelBody,
        position: new Vec3(-5, axisWidth/2, 0).vadd(centerOfMassAdjust),
        axis: new Vec3(0, 1, 0),
        direction: down
    });

    var wheelBody = new Body({ mass: 10 });
    wheelBody.addShape(wheelShape);
    this.vehicle.addWheel({
        body: wheelBody,
        position: new Vec3(-5, -axisWidth/2, 0).vadd(centerOfMassAdjust),
        axis: new Vec3(0, -1, 0),
        direction: down
    });

    // Some damping to not spin wheels too fast
    for(var i=0; i < this.vehicle.wheelBodies.length; i++){
        this.vehicle.wheelBodies[i].angularDamping = 0.4;
    }
  }

  setup() {

  }

  handler(event: any){
    var up = (event.type == 'keyup');

    if(!up && event.type !== 'keydown')
        return;

    switch(event.keyCode){

    case 38: // forward
        this.vehicle.setWheelForce(up ? 0 : maxForce, 2);
        this.vehicle.setWheelForce(up ? 0 : -maxForce, 3);
        break;

    case 40: // backward
        this.vehicle.setWheelForce(up ? 0 : -maxForce/2, 2);
        this.vehicle.setWheelForce(up ? 0 : maxForce/2, 3);
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
  }
};

var maxSteerVal = Math.PI / 8;
var maxSpeed = 10;
var maxForce = 100;