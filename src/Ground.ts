import { Body, Plane, World, Vec3 } from "cannon";
import { PlaneGeometry, MeshToonMaterial, DoubleSide, Mesh, Scene } from "three";

export default class Ground {
  world: World;
  scene: Scene;
  BODY: Body;
  SHAPE: Plane;
  GEOMETRY: PlaneGeometry;
  MATERIAL: MeshToonMaterial;
  MESH: Mesh;

  constructor(world: World, scene: Scene) {
    // Physics constructor
    this.world = world;
    this.BODY = new Body({
      mass: 0, // Static body
      type: Body.KINEMATIC,
      position: new Vec3(0, 0, 0),
    });
    this.SHAPE = new Plane();

    // Geometry constructor
    this.scene = scene;
    this.GEOMETRY = new PlaneGeometry( 100, 100, 32 );
    this.MATERIAL = new MeshToonMaterial({ color: 0xffff00, side: DoubleSide });
    this.MESH = new Mesh(this.GEOMETRY, this.MATERIAL);
  }

  setup() {
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
  }
}