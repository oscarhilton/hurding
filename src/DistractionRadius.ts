import PhysicsMesh from "./PhysicsMesh";
import { Vec3 } from "cannon";
import { Scene } from "three";
import Gizmo from "./Gizmo";
import { SIZE as TILE_SIZE} from "./Tiles/Tile";

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
    this.distractOrigin = new Vec3(x, y, z).mult(TILE_SIZE);
    this.inverse = inverse;
    this.distance = distance || DISTANCE_FROM_DISTRACTOR;
    this.strength = strength || 1;

    console.log(this.distractOrigin);
  }

  update(scene: Scene) {
    for (var myAgent of this.distractBodies) {
      const distractionAmount = this.computeDistractionAmount(myAgent);

      myAgent.body.velocity.x = distractionAmount.x;
      myAgent.body.velocity.y = distractionAmount.y;
      const oldZ = myAgent.body.velocity.z;
      myAgent.body.velocity.z = oldZ;
    }
    new Gizmo(0xFF0000, scene, this.distractOrigin.x, this.distractOrigin.y, this.distractOrigin.z);
    return;
  }

  computeDistractionAmount(myAgent: PhysicsMesh): Vec3 {
    const attracton = myAgent.body.position.negate(this.distractOrigin);
    const distance = this.distractOrigin.distanceTo(myAgent.body.position);
    attracton.normalize();
    attracton.mult(1500 / Math.pow(distance, 2), new Vec3(10, 10, 10));
    attracton.mult(TILE_SIZE);
    if (this.inverse) {
      attracton.x *= -1;
      attracton.y *= -1;
    }
    return attracton;
  }
}