"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("three");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var fov = 45;
var aspect = 2; // the canvas default
var near = 0.1;
var far = 5000;
var TheeInstance = /** @class */ (function () {
    function TheeInstance() {
        this.scene = new three_1.Scene();
        this.camera = new three_1.PerspectiveCamera(fov, aspect, near, far);
        this.renderer = new three_1.WebGLRenderer();
        this.ambientLight = new three_1.AmbientLight(0xFFFFFF, 0.3);
        this.sun = new three_1.DirectionalLight(0xf0e5b5, 0.95);
        this.sun.position.set(-10, 10, 3);
        this.controls = new OrbitControls_1.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
    }
    TheeInstance.prototype.setup = function () {
        this.camera.position.set(0, 0, 20);
        this.camera.lookAt(this.scene.position);
        this.camera.rotation.z = 45;
        this.scene.add(this.camera);
        // this.scene.add(this.ambientLight);
        this.scene.add(this.sun);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    };
    TheeInstance.prototype.resizeRendererToDisplaySize = function (renderer) {
        var canvas = renderer.domElement;
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
        var needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    };
    TheeInstance.prototype.handleRender = function () {
        if (this.resizeRendererToDisplaySize(this.renderer)) {
            var canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }
        this.renderer.render(this.scene, this.camera);
    };
    return TheeInstance;
}());
exports.default = TheeInstance;
