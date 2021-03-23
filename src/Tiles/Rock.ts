import LoadTexture from "../textures/LoadTexture";
import Tile from './Tile';
import { MeshPhongMaterial } from 'three';
export default class Rock extends Tile {
  constructor(neighbouringTiles: object, x: number, y: number, z: number) {
    console.log(neighbouringTiles);
    super(neighbouringTiles, true, x, y, z);
  }
}