import PhysicsMesh from "./PhysicsMesh";
import { Vec3 } from "cannon";

const DISTANCE_FROM_NEIGHBOUR = 10;
export default class Flock {
  flockBodies: PhysicsMesh[];

  constructor(flockBodies: PhysicsMesh[]) {
    this.flockBodies = flockBodies;
  }

  update() {
    for (var myAgent of this.flockBodies) {
      const alignment = this.computeAlignment(myAgent);
      const cohesion = this.computeCohesion(myAgent);
      const separation = this.computeSeparation(myAgent);

      const force = new Vec3(
        alignment.x + cohesion.x + separation.x,
        alignment.y + cohesion.y + separation.y,
        alignment.z + cohesion.z + separation.z
      );

      force.mult(0.5);

      myAgent.addForce(force);
    }
    return;
  }

  // Alignment is a behavior that causes a particular agent to line up with agents close by.
  computeAlignment(myAgent: PhysicsMesh): Vec3 {
    let point = new Vec3();
    let neighbors = 0;
    for( var agent of this.flockBodies) {
      if (myAgent !== agent) {
        const distance = myAgent.body.position.distanceTo(agent.body.position);
        if (distance < DISTANCE_FROM_NEIGHBOUR) {
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
      return point;
    }
  }

  // Cohesion is a behavior that causes agents to steer towards the "center of mass"
  computeCohesion(myAgent: PhysicsMesh): Vec3 {
    let point = new Vec3();
    let neighbors = 0;
    for( var agent of this.flockBodies) {
      if (myAgent !== agent) {
        const distance = myAgent.body.position.distanceTo(agent.body.position);
        if (distance < DISTANCE_FROM_NEIGHBOUR) {
          point.x += agent.body.position.x;
          point.y += agent.body.position.y;
          neighbors++;
        }
      }
    }
    if (neighbors === 0) {
      return point;
    } else {
      point.x = point.x / neighbors;
      point.y = point.y / neighbors;
      point = new Vec3(point.x - myAgent.body.position.x, point.y - myAgent.body.position.y, point.z);
      point.normalize();
      return point;
    }
  }

  // Separation is the behavior that causes an agent to steer away from all of its neighbors.
  computeSeparation(myAgent: PhysicsMesh): Vec3{
    let point = new Vec3();
    let neighbors = 0;
    for( var agent of this.flockBodies) {
      if (myAgent !== agent) {
        const distance = myAgent.body.position.distanceTo(agent.body.position);
        if (distance < DISTANCE_FROM_NEIGHBOUR) {
          point.x += agent.body.position.x - myAgent.body.position.x;
          point.y += agent.body.position.y - myAgent.body.position.y;
          neighbors++;
        }
      }
    }
    if (neighbors === 0) {
      return point;
    } else {
      point.x = point.x / neighbors;
      point.y = point.y / neighbors;
      point.x *= -1;
      point.y *= -1;
      point.normalize();
      return point;
    }
  }
}
