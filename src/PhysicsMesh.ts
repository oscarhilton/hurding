import { Scene} from "three";
import { World } from "cannon";

export default class PhysicsMesh {
  world: World;
  scene: Scene;
  body: any;
  mesh: any;

  constructor (world: World, scene: Scene) {
    this.world = world;
    this.scene = scene;
    this.body = null;
    this.mesh = null;
  }

  setup() {
    if (this.body) {
      this.body.addEventListener("collide", this.hanldeCollisions.bind(this));
    }
  }

  update() {
    this.mesh.position.x = this.body.position.x;
    this.mesh.position.y = this.body.position.y;
    this.mesh.position.z = this.body.position.z;
    this.mesh.quaternion.x = this.body.quaternion.x;
    this.mesh.quaternion.y = this.body.quaternion.y;
    this.mesh.quaternion.z = this.body.quaternion.z;
    this.mesh.quaternion.w = this.body.quaternion.w;
    return;
  }

  hanldeCollisions() {
    // Handle collisions here
  }
}