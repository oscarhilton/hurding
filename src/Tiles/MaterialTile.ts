import Tile from "./Tile";
import { Texture, MeshPhongMaterial } from "three";

export default class MaterialTile extends Tile {
  constructor(textures: any[], killsDucks: boolean, x: number, y: number, z: number) {
    const material = textures.map(t => {
      if (t === Texture) {
        new MeshPhongMaterial({ map: t, transparent: true, visible: true })
      }
    });
    super(killsDucks, x, y, z, material);
  }
}