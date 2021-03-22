import Tile from "./Tile";

export default class Distraction extends Tile {
  constructor(x: number, y: number, z: number) {
    super(false, 0xFF6347, x, y, z);
  }
}