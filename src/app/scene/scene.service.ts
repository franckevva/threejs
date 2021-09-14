import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ISceneState } from '../share';
import { FingerprintService } from '../share/services/fingerprint.service';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  private readonly url = `${environment.url}api/scene`;

  constructor(
    private http: HttpClient,
    private fingerprint: FingerprintService
  ) {}

  public setCameraState(value: string): Observable<any> {
    return this.fingerprint.getVisitorId().pipe(
      switchMap((userId) => {
        return this.http.post(this.url, {
          cameraPosition: value,
          userId,
        });
      })
    );
  }

  public getCameraState(): Observable<ISceneState | null> {
    return this.fingerprint
      .getVisitorId()
      .pipe(
        switchMap((userId) =>
          this.http
            .get<ISceneState>(`${this.url}/${userId}`)
            .pipe(catchError((err) => of(null)))
        )
      );
  }
}
