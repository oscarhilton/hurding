import { Scene, BoxGeometry, MeshPhongMaterial, Mesh } from "three";
import { World, Box, Body, Vec3 } from "cannon";

export const SIZE = 8;

export default class Tile {
  neighbouringTiles: object;
  killsDucks: boolean;
  halfExtents: Vec3;
  shape: Box;
  body: Body;
  geometry: BoxGeometry;
  material: MeshPhongMaterial;
  mesh: Mesh;
  colour: any;

  constructor(neighbouringTiles: object, killsDucks: boolean, colour: any, x: number, y: number, z: number, texture?: any,) {
    this.neighbouringTiles = neighbouringTiles;
    this.killsDucks = killsDucks;

    // Physics constructor
    this.halfExtents = new Vec3(SIZE / 2, SIZE / 2, SIZE / 2);
    this.shape = new Box(this.halfExtents);
    this.body = new Body({
      mass: 0,
      position: new Vec3( x * SIZE, y * SIZE, z * SIZE),
    });

    // Geometry constructor
    this.geometry = new BoxGeometry( SIZE, SIZE, SIZE);
    this.material = new MeshPhongMaterial( { color: colour, map: texture } );
    this.mesh = new Mesh( this.geometry, this.material );
    this.mesh.castShadow = true;
    this.mesh.position.set(x * SIZE, y * SIZE, z * SIZE);
  }

  setup(world: World, scene: Scene) {
    this.body.addShape(this.shape);
    world.addBody(this.body);
    scene.add(this.mesh);
  }
}