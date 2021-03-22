import Tile from './Tile';
import LoadTexture from "../textures/LoadTexture";
export default class Water extends Tile {
  constructor(x: number, y: number, z: number) {
    super(true, 0x80DAEB, x, y, z, LoadTexture("textures/sea.png"));
  }
}