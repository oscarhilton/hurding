import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import Tile from "./Tile";
import { Scene } from "three";
import { World } from "cannon";

export default class Bridge extends Tile {
  object: any;

  constructor(x: number, y: number, z: number) {
    super(false, 0xD2691E, x, y, z, null);
    const loader = new OBJLoader();
    loader.load("objects/logs.obj", root => this.object = root);
  }

  setup(world: World, scene: Scene) {
    super.setup(world, scene);
    scene.add(this.mesh);
  }
}