import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit {
  public canLoad = false;
  public readonly warning: string = "Your browser doesn't support WEBGL";

  constructor() {}

  ngOnInit(): void {
    this.canLoad = this.isWebGLAvailable();
  }

  private isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }
}
