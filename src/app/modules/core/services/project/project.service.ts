import { EventEmitter, Injectable } from '@angular/core';
import { ListService } from '../list/list.service';
import { Project } from 'src/app/modules/models/project.model';
import { EMPTY, Observable, catchError, map, of, switchMap, Subscription } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { ApiResponse } from 'src/app/modules/models/apiResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/modules/api-rest/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService implements ListService<Project> {

  url:string = "https://lamansysfaketaskmanagerapi.onrender.com/api"

  //datos mock
  projectsList: Project[] = [
    new Project('Project 0', ['Fulanito', 'Pepito'], 'Holaa soy una descripcion', 'icon'),
    new Project('Project 1', ['User 1', 'Jose'],    'Holaa soy una descripcion', 'icon'),
    new Project('Project 2', ['User 1', 'User 2'], 'Holaa soy una descripcion', 'icon'),
    new Project('Project 3', ['User 1', 'User 2'], 'Holaa soy una descripcion', 'icon'),
    new Project('Project 4', ['User 1', 'User 2'], 'Holaa soy una descripcion', 'icon'),
  ];
  isLoggedIn: boolean = false;
 

  // projectsList$ = new Observable<Project[]>();

  constructor(private ls: LocalStorageService, private http:HttpClient, private authService: AuthService) {
    //carga de datos mock
    // this.ls.updateItem('projects', this.projectsList);
  }

  getItems(): Observable<Project[]> {
    return this.ls
      .getItem<Project[]>('projects')
      .pipe(map((data) => data || []));
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

  getItemById(id: number): Project | undefined{
    let item: Project | undefined;
    item = this.projectsList.find((item) => item.id == id);
    return item;
  }

  


  getAllProjects(): Observable<Project[]> {
    let loggedIn = false;

    this.authService.loggedIn$.subscribe(value => {
      loggedIn = value;
    });

    if (loggedIn) {
      console.log("estoy logueada y voy a ir a buscar los proyectos")
      const headers = this.authService.getHeaders();
      return this.http.get<ApiResponse>(`${this.url}/projects`, { headers }).pipe(
        map(response => response.data),
        catchError(() => of([])) // Manejar error y devolver lista vacía
      );
    } else {
      return of([]); // No está logueado, devolver lista vacía
    }
    }
  
  
  
}
