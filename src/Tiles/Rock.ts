import Tile from "./Tile";

export default class Rock extends Tile {
  constructor(neighbouringTiles: object, x: number, y: number, z: number) {
    super(neighbouringTiles, false, 0xd3d3d3, x, y, z, null);
  }
}