import { Scene, BoxGeometry, MeshToonMaterial, Mesh } from "three";
import { World, Box, Body, Vec3 } from "cannon";
import PhysicsMesh from "./PhysicsMesh";

const DEFAULT_SIZE = 1;
const DEFAULT_MASS = 5;

export default class Duck extends PhysicsMesh {
  isAlive: boolean;
  size: number;
  halfExtents: Vec3;
  shape: Box;
  body: Body;
  geometry: BoxGeometry;
  material: MeshToonMaterial;
  mesh: Mesh;

  constructor(world: World, scene: Scene, x: number, y: number) {
    super(world, scene);
    // Charactoristics constructor
    this.isAlive = true;
    // Physics constructor
    this.size = DEFAULT_SIZE;
    this.halfExtents = new Vec3(this.size / 2, this.size / 2, this.size / 2);
    this.shape = new Box(this.halfExtents);
    this.body = new Body({
      mass: DEFAULT_MASS,
      position: new Vec3( x, y, 10 ),
    });

    // Geometry constructor
    this.geometry = new BoxGeometry( DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE);
    this.material = new MeshToonMaterial( { color: 0xFF8000 } );
    this.mesh = new Mesh( this.geometry, this.material );
    this.setup();
  }

  setup() {
    this.body.addShape(this.shape);
    this.world.addBody(this.body);
    this.scene.add(this.mesh);
    super.run();
  }

  kill() {
    return this.isAlive = false;
  }
}

