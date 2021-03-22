import PhysicsMesh from "./PhysicsMesh";
import { Vec3 } from "cannon";

const AGENT_SPEED = 100;
const DISTANCE_FROM_DISTRACTOR = 300;

export default class DestractionRadius {
  distractBodies: PhysicsMesh[];
  distractOrigin: Vec3;
  inverse: boolean;
  distance: number;
  strength: number;

  constructor(distractBodies: PhysicsMesh[], x: number, y: number, z: number, inverse: boolean, strength?: number, distance?: number) {
    this.distractBodies = distractBodies;
    this.distractOrigin = new Vec3(x, y, z);
    this.inverse = inverse;
    this.distance = distance || DISTANCE_FROM_DISTRACTOR;
    this.strength = strength || 1;

    console.log(this.inverse, "<<<<<");
  }

  update() {
    for (var myAgent of this.distractBodies) {
      const distractionAmount = this.computeDistractionAmount(myAgent);

      myAgent.body.velocity.x = distractionAmount.x * this.strength;
      myAgent.body.velocity.y = distractionAmount.y * this.strength;
      const oldZ = myAgent.body.velocity.z;

      myAgent.body.velocity.normalize(AGENT_SPEED);
      myAgent.body.velocity.z = oldZ;
    }
  }

  computeDistractionAmount(myAgent: PhysicsMesh): Vec3 {
    let point = new Vec3();
    let distractedCount = 0;

    const distance = myAgent.body.position.distanceTo(this.distractOrigin);
    if (distance < DISTANCE_FROM_DISTRACTOR) {
      point.x += myAgent.body.position.x - this.distractOrigin.x;
      point.y += myAgent.body.position.y - this.distractOrigin.y;
      if (this.inverse) {
        point.x *= -1;
        point.y *= -1;
      }
      distractedCount++;
    }

    console.log(point);
    return point;
  }
}