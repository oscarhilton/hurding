import { Scene, BoxGeometry, MeshPhongMaterial, Mesh } from "three";
import { World, Box, Body, Vec3, RigidVehicle } from "cannon";
import PhysicsMesh from "./PhysicsMesh";

const DEFAULT_SIZE = 1;
const DEFAULT_MASS = 50;

export default class Duck extends PhysicsMesh {
  isAlive: boolean;
  halfExtents: Vec3;
  shape: Box;
  body: Body;
  geometry: BoxGeometry;
  material: MeshPhongMaterial;
  mesh: Mesh;
  vehicle: RigidVehicle;

  constructor(x: number, y: number, z: number) {
    super();
    // Charactoristics constructor
    this.isAlive = true;
    // Physics constructor
    this.halfExtents = new Vec3(DEFAULT_SIZE / 2, DEFAULT_SIZE / 2, DEFAULT_SIZE / 2);
    this.shape = new Box(this.halfExtents);
    this.body = new Body({
      mass: DEFAULT_MASS,
      position: new Vec3( x, y, 10 + z ),
    });

    this.vehicle = new RigidVehicle({ chassisBody: this.body });

    const oldZ = this.body.position.z
    this.body.position.mult(8, this.body.position);
    this.body.position.z = oldZ;

    // Geometry constructor
    this.geometry = new BoxGeometry( DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE);
    this.material = new MeshPhongMaterial( { color: 0xFF8000 } );
    this.mesh = new Mesh( this.geometry, this.material );
    this.mesh.castShadow = true;
  }

  setup(scene: Scene, world: World) {
    this.body.addShape(this.shape);
    world.addBody(this.body);
    scene.add(this.mesh);
    super.setup(scene, world);
    return;
  }

  giveRandomInpulse() {
    var x = 2 * Math.random() - 1;
    var y = 2 * Math.random() - 1;
    var z = 2 * Math.random() - 1;
    const randomVector = new Vec3(x, y, z).mult(10);
    super.addForce(randomVector);
  }

  update() {
    super.update();

    if (this.isAlive) {
      this.giveRandomInpulse();
    } else {
      console.log("duck is dead");
    }
    return;
  }

  kill() {
    return this.isAlive = false;
  }
}

