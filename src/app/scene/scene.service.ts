import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ISceneState } from '../share';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  private cameraState: string;
  private readonly url = `${environment.url}api/scene`;

  constructor(private http: HttpClient) {}

  public setCameraState(value: string) {
    this.cameraState = value;
    return this.http.post(this.url, { cameraPosition: value, userId: '1' });
    // return of();
  }

  public getCameraState(): Observable<ISceneState> {
    return this.http.get<any[]>(this.url).pipe(
      map((states) => {
        console.log(states);
        return states[states.length - 1];
      })
    );
  }
}
