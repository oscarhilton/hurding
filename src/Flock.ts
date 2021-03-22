import PhysicsMesh from "./PhysicsMesh";
import { Vec3 } from "cannon";

export default class Flock {
  flockBodies: PhysicsMesh[];

  constructor(flockBodies: PhysicsMesh[]) {
    this.flockBodies = flockBodies;
  }

  update() {
    for (var myAgent of this.flockBodies) {
      this.computeAlignment(myAgent);
    }
  }

  computeAlignment(myAgent: PhysicsMesh) {
    let point = new Vec3();
    let neighbors = 0;
    for( var agent of this.flockBodies) {
      if (myAgent !== agent) {
        const distance = myAgent.body.position.distanceTo(agent.body.position);
        if (distance < 300) {
          point.x += agent.body.velocity.x;
          point.y += agent.body.velocity.y;
          neighbors++;
        }
      }
    }
    if (neighbors === 0) {
      return point;
    } else {
      point.x = point.x / neighbors;
      point.y = point.y / neighbors;
      point.normalize();
      console.log(point);
      return point;
    }
  }
}


// Alignment
// Alignment is a behavior that causes a particular agent to line up with agents close by.
// Cohesion
// The implementation is almost identical to that of the alignment behavior, but there are some key differences. First, instead of adding the velocity to the computation vector, the position is added instead.
// Separation
// The implementation of separation is very similar to that of alignment and cohesion, so I'll only point out what is different. When a neighboring agent is found, the distance from the agent to the neighbor is added to the computation vector.