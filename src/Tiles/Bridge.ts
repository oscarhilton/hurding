import Tile from "./Tile";

export default class Bridge extends Tile {
  constructor(x: number, y: number, z: number) {
    super(false, 0xD2691E, x, y, z, null);
  }
}