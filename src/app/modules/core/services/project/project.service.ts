import { EventEmitter, Injectable } from '@angular/core';
import { ListService } from '../list/list.service';
import { Project } from 'src/app/modules/models/project.model';
import { Observable, map } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements ListService<Project>{
  //datos mock
  projectsList: Project[] = [
    new Project('Project 1', ['User 1', 'User 2'], 'Description 1', 'icon'),
    new Project('Project 2', ['User 1', 'User 2'], 'Description 2', 'icon'),
    new Project('Project 3', ['User 1', 'User 2'], 'Description 3', 'icon'),
    new Project('Project 4', ['User 1', 'User 2'], 'Description 4', 'icon'),
  ];

  projectsList$ = new Observable<Project[]>();

  constructor(private ls: LocalStorageService) {
    //carga de datos mock
    this.ls.updateItem('projects', this.projectsList);
  }

  getItems(): Observable<Project[]> {
    return this.ls.getItem<Project[]>('projects')
      .pipe(map(data => data || []) );
  }

  createItem(item: Project): Observable<Project> {
    throw new Error('Method not implemented.');
  }

  updateItem(item: Project): Observable<Project> {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: string): Observable<Project> {
    throw new Error('Method not implemented.');
  }
}
