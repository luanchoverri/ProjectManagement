import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Epic } from 'src/app/modules/models/epic.model';
import { Project } from 'src/app/modules/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class EpicService {
  private readonly EPIC_KEY = 'epics';
  private epicsList$ = new Observable<Epic[]>();

  private project1 = new Project('Project 1', ['User 1', 'User 2'], 'Description 1', 'icon');

  epicsList: Epic[] = [
    new Epic('Epic 1', 'Description 1', this.project1, 'icon'),
    new Epic('Epic 2', 'Description 2', this.project1, 'icon'),
    new Epic('Epic 3', 'Description 3', this.project1, 'icon')
  ];

  constructor(private storage: LocalStorageService) {
    this.storage.updateItem(this.EPIC_KEY, this.epicsList);  
  }

  public getEpicsByProjectId(projectId: string): Observable<Epic[]> {
    return this.storage.getItem<Epic[]>(this.EPIC_KEY).pipe(
      map((epics: Epic[] | undefined) => {
        if (epics) {
          return epics.filter(epic => epic.project.id === projectId);
        } else {
          return [];
        }
      })
    );
  }

}
