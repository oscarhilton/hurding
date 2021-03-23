import Tile from "./Tile";

export default class Distraction extends Tile {
  constructor(neighbouringTiles: object, x: number, y: number, z: number) {
    super(neighbouringTiles, false, 0xFF6347, x, y, z);
  }
}