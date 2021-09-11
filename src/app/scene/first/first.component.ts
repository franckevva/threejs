import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import * as THREE from 'three';

const SCENE_PATH = '/assets/scenes/fantasy_book/scene.gltf';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements AfterViewInit {
  @ViewChild('canvas') private canvasRef: ElementRef;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private get aspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  private loader = new GLTFLoader();
  private mixer: THREE.AnimationMixer;
  private clock = new THREE.Clock();
  private pmremGenerator: THREE.PMREMGenerator;
  private controls: OrbitControls;
  private dracoLoader: DRACOLoader;

  constructor() {}

  ngAfterViewInit() {
    this.createScene();
  }

  private createScene() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);

    // SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#eaeeaf');
    this.scene.environment = this.pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;

    this.camera = new THREE.PerspectiveCamera(100, this.aspectRatio, 1, 1000);
    this.camera.position.set(15, 30, 70);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.target.set(0, 0.5, 0);
    this.controls.update();
    this.controls.enablePan = false;
    this.controls.enableDamping = true;

    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('three/examples/jsm/libs/draco/gltf');

    this.loader.setDRACOLoader(this.dracoLoader);
    this.loader.load(
      SCENE_PATH,
      (gltf) => {
        const model = gltf.scene;
        model.position.set(1, 1, 10);
        model.scale.set(1, 1, 1);

        this.scene.add(model);

        this.mixer = new THREE.AnimationMixer(model);
        this.mixer.clipAction(gltf.animations[0]).play();
        this.animate();
      },
      undefined,
      (error) => console.log(error)
    );
  }

  private animate() {
    let component: FirstComponent = this;
    (function render() {
      requestAnimationFrame(render);
      const delta = component.clock.getDelta();
      component.mixer.update(delta);
      component.controls.update();
      component.renderer.render(component.scene, component.camera);
    })();
  }
}
