import Tile from "./Tile";
import LoadTexture from "../textures/LoadTexture";
export default class Floor extends Tile {
  constructor(neighbouringTiles: object, x: number, y: number, z: number) {
    super(neighbouringTiles, false, 0x7cfc00, x, y, z, LoadTexture("textures/grass.jpeg"));
  }
}