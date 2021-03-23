import { Scene, BoxGeometry, MeshPhongMaterial, Mesh, MeshBasicMaterial } from "three";
import { World, Box, Body, Vec3 } from "cannon";
import TILES from "../tiles";
import LoadTexture from "../textures/LoadTexture";

export const SIZE = 8;
const DONT_SHOW_FACE = new MeshBasicMaterial({ visible: false });

export default class Tile {
  killsDucks: boolean;
  halfExtents: Vec3;
  shape: Box;
  body: Body;
  geometry: BoxGeometry;
  mesh: Mesh;
  colour: any;

  constructor(neighbouringTiles: any, killsDucks: boolean, x: number, y: number, z: number) {
    let faces = {
      one: DONT_SHOW_FACE,
      two: DONT_SHOW_FACE,
      three: DONT_SHOW_FACE,
      four: DONT_SHOW_FACE,
      five: DONT_SHOW_FACE,
      six: DONT_SHOW_FACE,
    };

    const top = new MeshPhongMaterial({ opacity: 0.5, map: LoadTexture("/textures/sea/baseSea.png") });
    const blue = new MeshPhongMaterial({ opacity: 0.5, color: 0xffff00 });

    if (neighbouringTiles) {
      // as a die, 1 on top, 6 on bottom.
      const {
        layerCurrentNeighbours,
        layerAboveNeighbours,
        layerBelowNeighbours,
      } = neighbouringTiles;

    if (
      !layerBelowNeighbours &&
      layerAboveNeighbours?.TM === TILES.nothing || null
    ) {
      faces.one = top;
    }

    if (
      layerBelowNeighbours === null
    ) {
      faces.six = blue; // CORRECT
    }

    if (layerCurrentNeighbours) {
      if (
        layerCurrentNeighbours.ML === null &&
        layerCurrentNeighbours.MR === TILES.nothing || null
      ) {
        faces.three = blue; // CORRECT
      }
      if (
        layerCurrentNeighbours.MR === null &&
        layerCurrentNeighbours.ML ===  TILES.nothing || null
        ) {
          faces.two = blue; // CORRECT
        }
        if (
          layerCurrentNeighbours.BM === null &&
          layerCurrentNeighbours.TM === null
          ) {
            faces.four = blue;
          }
          if (
            layerCurrentNeighbours.TM === null &&
            layerCurrentNeighbours.BM === null
            ) {
              faces.five = blue;
            }
    }
  }
  
    const material = [
      faces.two,
      faces.three,
      faces.four,
      faces.five,
      faces.one, // TOP
      faces.six, // BOTTOM
    ]


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
    this.mesh = new Mesh( this.geometry, material );
    this.mesh.castShadow = true;
    this.mesh.position.set(x * SIZE, y * SIZE, z * SIZE);
  }

  setup(world: World, scene: Scene) {
    this.body.addShape(this.shape);
    world.addBody(this.body);
    scene.add(this.mesh);
  }
}