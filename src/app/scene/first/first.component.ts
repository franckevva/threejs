import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as THREE from 'three';

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
  private geometry = new THREE.BoxGeometry();
  private material = new THREE.MeshBasicMaterial({ color: '#ffa500' });
  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  constructor() {}

  ngAfterViewInit() {
    this.createScene();
    this.startRender();
  }

  private createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#eaeeaf');
    this.camera = new THREE.PerspectiveCamera(100, this.aspectRatio, 0.1, 1000);

    this.scene.add(this.cube);
    this.camera.position.z = 7;
  }

  private startRender() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    // document.body.appendChild(this.renderer.domElement);

    this.animate();
  }

  private animate() {
    let component: FirstComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    })();
  }

  private animateCube() {
    this.cube.rotation.x += 0.02;
    this.cube.rotation.y += 0.01;
  }
}
