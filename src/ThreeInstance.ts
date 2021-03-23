import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, Fog, Color, Vector3, AxesHelper } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const fov = 45;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 250;

export default class TheeInstance {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  ambientLight: AmbientLight;
  sun: DirectionalLight;
  controls: OrbitControls;
  axesHelper: AxesHelper;

  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera( fov, aspect, near, far );
    this.renderer = new WebGLRenderer();
    this.ambientLight = new AmbientLight(0xFFFFFF, 1);
    this.sun = new DirectionalLight(0xf0e5b5, 1.2);
    this.sun.position.set(50, 50, 10);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25
    this.controls.enableZoom = true;

    this.axesHelper = new AxesHelper( 300 );
  }

  setup() {
    // this.camera.position.set(0, 0, 20);
    this.scene.add(this.camera);
    this.scene.add(this.ambientLight);
    this.scene.add(this.sun);
    this.scene.add(this.axesHelper);
    // Add fog
    this.scene.fog = new Fog(0x87CEEB, near, far);
    // Add background
    this.scene.background = new Color(0x87CEEB);
    // Set rendering size
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    return document.body.appendChild(this.renderer.domElement);
  }

  updateCamera({ x, y }: { x: number, y: number}): void {
    const vector = new Vector3(x, y, 20);
    this.camera.position.copy(vector);
    this.camera.lookAt(vector);
    this.controls.update();
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
    return this.renderer.render(this.scene, this.camera);
  }
}