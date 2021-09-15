import { Injectable } from '@angular/core';
import { from, Observable, ReplaySubject, Subject } from 'rxjs';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FingerprintService {
  private _visitorId: ReplaySubject<string>;

  /*
   * get unique key by fingerprint lib
   */
  public getVisitorId(): Observable<string> {
    if (this._visitorId) {
      return this._visitorId.asObservable();
    }

    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load();

    return from(fpPromise).pipe(
      switchMap((fp) =>
        from(fp.get()).pipe(
          switchMap((result) => {
            this._visitorId = new ReplaySubject<string>();
            this._visitorId.next(result.visitorId);
            this._visitorId.complete();
            return this._visitorId.asObservable();
          })
        )
      )
    );
  }
}
