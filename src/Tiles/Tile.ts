import { Scene, BoxGeometry, MeshToonMaterial, Mesh } from "three";
import { World, Box, Body, Vec3 } from "cannon";

export const SIZE = 2;

export default class Tile {
  killsDucks: boolean;
  halfExtents: Vec3;
  shape: Box;
  body: Body;
  geometry: BoxGeometry;
  material: MeshToonMaterial;
  mesh: Mesh;
  colour: any;

  constructor(killsDucks: boolean, colour: any, x: number, y: number, z: number) {
    this.killsDucks = killsDucks;

    // Physics constructor
    this.halfExtents = new Vec3(SIZE / 2, SIZE / 2, SIZE / 2);
    this.shape = new Box(this.halfExtents);
    this.body = new Body({
      mass: 0,
      position: new Vec3( x, y, z ),
    });

    // Geometry constructor
    this.geometry = new BoxGeometry( SIZE, SIZE, SIZE );
    this.material = new MeshToonMaterial( { color: colour } );
    this.mesh = new Mesh( this.geometry, this.material );
    this.mesh.position.set(x, y, z);
  }

  setup(world: World, scene: Scene) {
    this.body.addShape(this.shape);
    world.addBody(this.body);
    scene.add(this.mesh);
  }
}