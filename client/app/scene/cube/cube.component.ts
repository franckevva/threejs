import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnDestroy
} from '@angular/core';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss'],
})
export class CubeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvasRef: ElementRef;

  public cameraZ = 5;
  public fieldofView = 100;
  public nearClippingPlane = 0.1;
  public farClippingPlane = 1000;

  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private geometry = new THREE.BoxGeometry(2, 2, 2);
  private material = new THREE.MeshPhongMaterial({
    specular: 0xd76531,
    color: 0xef8834,
    emissive: 0x8c2317,
    shininess: 50,
    wireframe: false,
  });

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private controls: OrbitControls;
  private light: THREE.DirectionalLight;
  private gui: GUI;

  private cubeValues = {
    lightProbeIntensity: 1,
    directionalLightIntensity: 2,
    scale: 1,
    rotationSpeedX: 0.02,
    rotationSpeedY: 0.01,
  };

  /* update view on resize */
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (!this.camera || !this.renderer) {
      return;
    }

    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  constructor() {}

  ngAfterViewInit() {
    this.createScene();
    this.createRender();
    this.createLight();
    this.createGUI();

    this.animate();
  }

  private createScene() {
    // scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#fafff0');
    this.scene.add(this.cube);

    // camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldofView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private animateCube() {
    this.cube.rotation.x += this.cubeValues.rotationSpeedX;
    this.cube.rotation.y += this.cubeValues.rotationSpeedY;
  }

  private createRender() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  private animate() {
    let component: CubeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.render();
    })();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }

  private createLight() {
    this.light = new THREE.DirectionalLight(
      0xfdfdfd,
      this.cubeValues.directionalLightIntensity
    );
    this.light.position.set(2, 2, 1).normalize();
    this.scene.add(this.light);

    var ambientLight = new THREE.AmbientLight(0x000022);
    this.scene.add(ambientLight);
  }

  private createGUI() {
    this.gui = new GUI();

    this.gui.width = 300;

    this.gui.domElement.style.userSelect = 'none';

    const cubeFolder = this.gui.addFolder('Cube');

    cubeFolder
      .add(this.cubeValues, 'rotationSpeedX', 0.01, 0.5, 0.01)
      .name('speed of rotationX');
    cubeFolder
      .add(this.cubeValues, 'rotationSpeedY', 0.01, 0.5, 0.01)
      .name('speed of rotationY');
    cubeFolder.open();
    cubeFolder
      .add(this.cubeValues, 'scale', 0.1, 5, 0.1)
      .name('scale')
      .onChange(() => {
        this.cube.scale.x = this.cubeValues.scale;
        this.cube.scale.y = this.cubeValues.scale;
        this.cube.scale.z = this.cubeValues.scale;
      });

    const lightFolder = this.gui.addFolder('Light');
    lightFolder
      .add(this.cubeValues, 'lightProbeIntensity', 0, 5, 0.1)
      .name('light probe')
      .onChange(() => {
        this.light.intensity = this.cubeValues.lightProbeIntensity;
        this.render();
      });
    lightFolder
      .add(this.cubeValues, 'directionalLightIntensity', 0, 5, 0.1)
      .name('directional light')
      .onChange(() => {
        this.light.intensity = this.cubeValues.directionalLightIntensity;
        this.render();
      });
    lightFolder.open();
  }

  ngOnDestroy() {
    this.renderer.dispose();
    this.controls.dispose();
    this.gui.destroy();
  }
}
