import Tile from "./Tile";

export default class Floor extends Tile {
  constructor(x: number, y: number, z: number) {
    super(false, 0x7cfc00, x, y, z);
  }
}