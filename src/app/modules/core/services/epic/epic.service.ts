import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Epic } from 'src/app/modules/models/epic.model';

@Injectable({
  providedIn: 'root'
})
export class EpicService {
  private readonly EPIC_KEY = 'epics';

  constructor(private storage: LocalStorageService) { }

  public getEpics(): Observable<Epic[]> {
    return this.storage.getItem<Epic[]>(this.EPIC_KEY).pipe(
      map((epics: Epic[] | undefined) => {
        return epics || [];
      })
    );
  }

}
