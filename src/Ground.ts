import { Body, Plane, World, Vec3 } from "cannon";
import { PlaneGeometry, MeshToonMaterial, DoubleSide, Mesh, Scene } from "three";

export default class Ground {
  world: World;
  scene: Scene;
  body: Body;
  shape: Plane;
  geometry: PlaneGeometry;
  material: MeshToonMaterial;
  mesh: Mesh;

  constructor(world: World, scene: Scene) {
    // Physics constructor
    this.world = world;
    this.body = new Body({
      mass: 0, // Static body
      type: Body.KINEMATIC,
      position: new Vec3(0, 0, 0),
    });
    this.shape = new Plane();

    // Geometry constructor
    this.scene = scene;
    this.geometry = new PlaneGeometry( 100, 100, 32 );
    this.material = new MeshToonMaterial({ color: 0xffff00, side: DoubleSide });
    this.mesh = new Mesh(this.geometry, this.material);
  }

  setup() {
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
  }
}