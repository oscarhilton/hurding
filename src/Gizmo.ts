import { Scene, BoxGeometry, MeshBasicMaterial, Mesh } from "three";

export default class Gizmo {
  geometry: BoxGeometry;
  material: MeshBasicMaterial;
  mesh: Mesh;

  constructor(scene: Scene, x: number, y: number, z: number) {
    this.geometry = new BoxGeometry( 1, 1, 1 );
    this.material = new MeshBasicMaterial( {color: 0x00ff00} );
    this.mesh = new Mesh( this.geometry, this.material );
    this.mesh.position.set(x, y, z);
    scene.add(this.mesh);
  }
}