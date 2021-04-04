import { Scene } from "three";
import { World, Vec3 } from "cannon";

export default class PhysicsMesh {
  body: any;
  mesh: any;
  forces: Vec3[];

  constructor () {
    this.body = null;
    this.mesh = null;

    // Forces
    this.forces = [];
  }

  setup(scene: Scene, world: World) {
    if (this.body) {
      this.body.addEventListener("collide", this.handleCollisions.bind(this));
    }
  }

  addForce(force: Vec3) {
    this.forces.push(force);
  }

  update() {
    if (this.forces.length > 0) {
      const accumForce = this.forces.reduce((totalForce: Vec3, currentForce: Vec3): Vec3 => {
        const newForce = new Vec3(0, 0, 0);
        totalForce.vadd(currentForce, newForce);
        return newForce;
      }, new Vec3(0, 0, 0));
      accumForce.normalize();
      this.body.velocity.x = accumForce.x * 4;
      this.body.velocity.y = accumForce.y * 4;
      this.forces = [];
    }

    this.mesh.position.x = this.body.position.x;
    this.mesh.position.y = this.body.position.y;
    this.mesh.position.z = this.body.position.z;
    this.mesh.quaternion.x = this.body.quaternion.x;
    this.mesh.quaternion.y = this.body.quaternion.y;
    this.mesh.quaternion.z = this.body.quaternion.z;
    this.mesh.quaternion.w = this.body.quaternion.w;
    return;
  }

  handleCollisions() {
    // Handle collisions here
  }
}