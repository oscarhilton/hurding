import Tile from "./Tile";

export default class Rock extends Tile {
  constructor(x: number, y: number, z: number) {
    super(false, 0xd3d3d3, x, y, z, null);
  }
}