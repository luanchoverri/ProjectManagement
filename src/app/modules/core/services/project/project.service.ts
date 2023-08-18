import { Injectable } from '@angular/core';
import { ListService } from '../list/list.service';
import { Project } from 'src/app/modules/models/project.model';
<<<<<<< HEAD
import { Observable, Subject, catchError, map, of } from 'rxjs';
=======
import { Observable, catchError, map, of } from 'rxjs';
>>>>>>> 643e1ac (tg-87 Clean-up general)
import { LocalStorageService } from '../localStorage/local-storage.service';
import { ApiResponse } from 'src/app/modules/models/apiResponse';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/modules/api-rest/services/auth.service';
import { Epic } from 'src/app/modules/models/epic.model';
import { PathRest } from 'src/app/modules/api-rest/enviroments/path-rest';
import { endpoint } from 'src/app/modules/api-rest/enviroments/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends ListService<Project> {
  //datos mock
  // projectsList: Project[] = [
  //   new Project('Project 0', ['Fulanito', 'Pepito'], 'Holaa soy una descripcion', 'icon'),
  //   new Project('Project 1', ['User 1', 'Jose'],    'Holaa soy una descripcion', 'icon'),
  //   new Project('Project 2', ['User 1', 'User 2'], 'Holaa soy una descripcion', 'icon'),
  //   new Project('Project 3', ['User 1', 'User 2'], 'Holaa soy una descripcion', 'icon'),
  //   new Project('Project 4', ['User 1', 'User 2'], 'Holaa soy una descripcion', 'icon'),
  // ];

  isLoggedIn: boolean = false;
<<<<<<< HEAD
  projectsList: Project[];
  projectsList$ : Subject<Project[]>; 

  constructor(
    private ls: LocalStorageService,
    private http: HttpClient,
    private authService: AuthService,
  ) {
    super();
    this.projectsList = [];
    this.projectsList$ = new Subject<Project[]>();
=======
  projectsList$ = new Observable<Project[]>();

  constructor(
    private ls: LocalStorageService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    super();

    //carga de datos mock
    // this.ls.updateItem('projects', this.projectsList);

>>>>>>> 643e1ac (tg-87 Clean-up general)
    this.authService.loggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  //abstract methods
  override getItems(): Observable<Project[]> {
    //usando el localStorage:
    return this.ls
      .getItem<Project[]>('projects')
      .pipe(map((data) => data || []));
  }

  override createItem(item: Project): Observable<Project> {

      return this.http
        .post<ApiResponse>(PathRest.GET_PROJECTS, item)
        .pipe(map((response) => response.data));
    
  }

  override updateItem(item: Project): Observable<Project> {
    console.log('voy a actualizar el proyecto');
    return new Observable<Project>();
  }

  override deleteItem(id: string): Observable<Project> {
    console.log('voy a borrar el proyecto');
    return new Observable<Project>();
  }

  getProjectById(id: string): Observable<Project> {
    // if (this.isLoggedIn) {
<<<<<<< HEAD

    return this.http
      .get<ApiResponse>(`${PathRest.GET_PROJECTS}/${id}`)
      .pipe(map((response) => response.data));
  }

  getEpicsByProject(id: string): Observable<Epic[]> {
    return this.http
      .get<ApiResponse>(`${PathRest.GET_PROJECTS}/${id}${endpoint.EPICS}`)
      .pipe(
        map((response) => response.data),
        catchError(() => of([]))
      );
  }

  getAll(): Observable<Project[]> {
    return this.http.get<ApiResponse>(`${PathRest.GET_PROJECTS}`).pipe(
      map((response) => response.data),
      catchError(() => of([])) // Maneja error y devuelve lista vacia
    );
=======
    const headers = this.authService.getHeaders();
    return this.http
      .get<ApiResponse>(`${PathRest.GET_PROJECTS}/${id}`, { headers })
      .pipe(map((response) => response.data));
  }

  getEpicsByProject(id: string): Observable<Epic[]> {
    const headers = this.authService.getHeaders();
    return this.http
      .get<ApiResponse>(`${PathRest.GET_PROJECTS}/${id}/${endpoint.EPICS}`, {
        headers,
      })
      .pipe(
        map((response) => response.data),
        catchError(() => of([]))
      );
  }

  getAll(): Observable<Project[]> {
    let loggedIn = false;

    this.authService.loggedIn$.subscribe((value) => {
      loggedIn = value;
    });

    if (loggedIn) {
      console.log('estoy logueada y voy a ir a buscar los proyectos');
      const headers = this.authService.getHeaders();
      return this.http
        .get<ApiResponse>(PathRest.GET_PROJECTS, { headers })
        .pipe(
          map((response) => response.data),
          catchError(() => of([])) // Maneja error y devuelve lista vacia
        );
    } else {
      return of([]); // No esta logueado, devuelve lista vacia
    }
>>>>>>> 643e1ac (tg-87 Clean-up general)
  }
}
