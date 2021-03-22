import { Scene, BoxGeometry, MeshPhongMaterial, Mesh } from "three";
import { World, Box, Body, Vec3 } from "cannon";
import PhysicsMesh from "./PhysicsMesh";

const DEFAULT_SIZE = 1;
const DEFAULT_MASS = 5;

export default class Duck extends PhysicsMesh {
  isAlive: boolean;
  halfExtents: Vec3;
  shape: Box;
  body: Body;
  geometry: BoxGeometry;
  material: MeshPhongMaterial;
  mesh: Mesh;

  constructor(world: World, scene: Scene, x: number, y: number) {
    super(world, scene);
    // Charactoristics constructor
    this.isAlive = true;
    // Physics constructor
    this.halfExtents = new Vec3(DEFAULT_SIZE / 2, DEFAULT_SIZE / 2, DEFAULT_SIZE / 2);
    this.shape = new Box(this.halfExtents);
    this.body = new Body({
      mass: DEFAULT_MASS,
      position: new Vec3( x * DEFAULT_SIZE, y * DEFAULT_SIZE, 30 ),
    });

    // Geometry constructor
    this.geometry = new BoxGeometry( DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE);
    this.material = new MeshPhongMaterial( { color: 0xFF8000 } );
    this.mesh = new Mesh( this.geometry, this.material );
    this.mesh.castShadow = true;
  }

  setup() {
    this.body.addShape(this.shape);
    this.world.addBody(this.body);
    this.scene.add(this.mesh);
    super.setup();
    return;
  }

  update() {
    super.update();

    if (this.isAlive) {
      // this.body.velocity.x = 0;
      // this.body.velocity.y = 0;
      // this.body.velocity.x = (this.body.velocity.x + Math.random() * 2.5) * (Math.round(Math.random()) * 2 - 1);
      // this.body.velocity.y = (this.body.velocity.y + Math.random() * 2.5) * (Math.round(Math.random()) * 2 - 1);
    } else {
      console.log("duck is dead");
    }
    return;
  }

  kill() {
    return this.isAlive = false;
  }
}

