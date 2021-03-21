import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const fov = 45;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 5000;

export default class TheeInstance {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  ambientLight: AmbientLight;
  sun: DirectionalLight;
  controls: OrbitControls;

  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera( fov, aspect, near, far );
    this.renderer = new WebGLRenderer();
    this.ambientLight = new AmbientLight(0xFFFFFF, 0.3);
    this.sun = new DirectionalLight(0xf0e5b5, 0.95);
    this.sun.position.set(-10, 10, 3);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25
    this.controls.enableZoom = true;
  }

  setup() {
    this.camera.position.set(0, 0, 20);
    this.camera.lookAt( this.scene.position );
    this.camera.rotation.z = 45;
    this.scene.add(this.camera);
    // this.scene.add(this.ambientLight);
    this.scene.add(this.sun);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  resizeRendererToDisplaySize(renderer: WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  handleRender() {
    if (this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
    this.renderer.render(this.scene, this.camera);
  }
}