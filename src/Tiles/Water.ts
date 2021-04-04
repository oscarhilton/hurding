import LoadTexture from "../textures/LoadTexture";
import Tile from './Tile';
import { MeshPhongMaterial, MeshBasicMaterial, Mesh } from 'three';
import TILES from '../tiles';
import { NeighbourGridResult } from '../NeighbourGrid';
export default class Water extends Tile {
  constructor(neighbouringTiles: NeighbourGridResult, x: number, y: number, z: number) {
    console.log(neighbouringTiles);
    super(neighbouringTiles, true, x, y, z, "/textures/sea/baseSea.png");
  }
}