import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  private cameraState: string;

  constructor() {}

  public setCameraState(value: string) {
    this.cameraState = value;
    return of();
  }

  public getCameraState(): Observable<string> {
    return of(this.cameraState);
  }
}
