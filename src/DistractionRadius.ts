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
  }

  update() {
    for (var myAgent of this.distractBodies) {
      debugger
      const distractionInstance = this;
      const distractionAmount = distractionInstance.computeDistractionAmount(myAgent);

      console.log(distractionAmount);

      myAgent.body.velocity.x = distractionAmount.x;
      myAgent.body.velocity.y = distractionAmount.y;
      const oldZ = myAgent.body.velocity.z;

      myAgent.body.velocity.normalize(AGENT_SPEED);
      myAgent.body.velocity.z = oldZ;
      return;
    }
  }

  computeDistractionAmount(myAgent: PhysicsMesh): Vec3 {
    let agentToPoint = new Vec3();
    agentToPoint = myAgent.body.position.negate(agentToPoint);
    const distance = agentToPoint.norm();
    agentToPoint.normalize();
    agentToPoint.mult(1500 / Math.pow(distance, 2), new Vec3(this.strength, this.strength, this.strength));
    if (this.inverse) {
      agentToPoint.x *= -1;
      agentToPoint.y *= -1;
    }
    return agentToPoint;
  }
}