import PhysicsMesh from "./PhysicsMesh";
import { Vec3 } from "cannon";
import { Scene } from "three";
// import Gizmo from "./Gizmo";
import { SIZE as TILE_SIZE} from "./Tiles/Tile";

const DISTANCE_FROM_DISTRACTOR = 300;
const ATTRACTION_DISTANCE = 200;

export default class DestractionRadius {
  distractBodies: PhysicsMesh[];
  distractOrigin: Vec3;
  inverse: boolean;
  distance: number;
  multiplier: number;

  constructor(distractBodies: PhysicsMesh[], x: number, y: number, z: number, inverse: boolean, multiplier?: number, distance?: number) {
    this.distractBodies = distractBodies;
    this.distractOrigin = new Vec3(x * TILE_SIZE, y * TILE_SIZE, z * TILE_SIZE);
    this.inverse = inverse;
    this.distance = distance || DISTANCE_FROM_DISTRACTOR;
    this.multiplier = multiplier || 1;
  }

  // update(scene: Scene) {
  //   for (var myAgent of this.distractBodies) {
  //     const force = this.computeDistractionAmount(myAgent);
      
  //   }

  //   // new Gizmo(0xFF0000, scene, this.distractOrigin.x, this.distractOrigin.y, this.distractOrigin.z);
  //   return;
  // }

  computeDistractionAmount(myAgent: PhysicsMesh): void {
    // What is the forces direction?
    const force = new Vec3();
    this.distractOrigin.vsub(myAgent.body.position, force);

    // const angle = new Vec3();
    // const copy = myAgent.body.quaternion.copy();
    // copy.toAxisAngle(this.distractOrigin, angle);

    // console.log(angle);

    // const normAgent = myAgent.body.position.normalize();
    // const normOrigin = this.distractOrigin.normalize();

    console.log(myAgent.body.position.dot(this.distractOrigin));

    const isInFieldOfView = true;

    // What is the distance?
    const distance = force.norm();
    if (distance < ATTRACTION_DISTANCE && isInFieldOfView) { // If the distance is less than X amount
      // Normalize the force
      force.normalize();
      // Make the strength
      const strength = (this.multiplier * myAgent.body.mass) / (distance < 0 ? Math.pow(distance, 2) : 0.0001);
      // Multply the force by the strength
      force.mult(strength);
      if (this.inverse) {
        force.mult(-1);
      }
      return myAgent.addForce(force);
    } else {
      return;
    }
  }
}