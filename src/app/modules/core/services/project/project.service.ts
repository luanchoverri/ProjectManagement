import { Injectable } from '@angular/core';
import { ListService } from '../list/list.service';
import { Project } from 'src/app/modules/models/project.model';
import { Observable, Subject, catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { ApiResponse } from 'src/app/modules/models/apiResponse';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/modules/api-rest/services/auth.service';
import { Epic } from 'src/app/modules/models/epic.model';
import { PathRest } from 'src/app/modules/api-rest/enviroments/path-rest';
import { endpoint } from 'src/app/modules/api-rest/enviroments/endpoints';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectFormComponent } from 'src/app/modules/presentation/feature/forms/project-form/project-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user/user.service';

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
  projectsList: Project[];
  projectsList$: Subject<Project[]>;

  constructor(
    private ls: LocalStorageService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    super();
    this.projectsList = [];
    this.projectsList$ = new Subject<Project[]>();

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

  editItem(project: Project): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      data: { initialValues: project },
    });

    dialogRef.componentInstance.toggleIsEditing();
  }

  override updateItem(item: Project): Observable<Project | null> {
    return this.http
      .put<ApiResponse>(`${PathRest.GET_PROJECTS}/${item._id}`, item)
      .pipe(
        map((response) => response.data),
        catchError(() => of(null))
    );
  }

  override deleteItem(id: string): Observable<Project | null> {
    return this.getEpicsByProject(id).pipe(
      switchMap(epics => {
        if (epics.length > 0) {
          this.snackBar.open('This project has associated epics and cannot be deleted.', 'Close', {
            duration: 5000,
          });
          return of(null); 
        } else {
          return this.http.delete<ApiResponse>(`${PathRest.GET_PROJECTS}/${id}`)
            .pipe(
              map((response) => response.data),
              catchError(error => {
                return of(null);
              }),
              tap(() => {
                this.snackBar.open('Project deleted successfully.', 'Close', {
                  duration: 5000,
                });
              })
            );
        }
      })
    );
  }

  getProjectById(id: string): Observable<Project> {
    // if (this.isLoggedIn) {

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
  }


  // getSpecificationsList(project: Project): Observable<{ clave: string; valor: any }[]> {
  //   return this.getMembersNames(project.members).pipe(
  //     map(membersNames => {
  //       const specifications: { clave: string; valor: any }[] = [
  //         { clave: "members", valor: membersNames.join(', ') }, 
  //       ];

  //       console.log(specifications);
  //       return specifications.filter(specification => specification.valor !== null);
  //     })
  //   );
  // }

  // getMembersNames(memberIds: string[]): Observable<string[]> {
  //   const membersNames$: Observable<string>[] = memberIds.map(memberId =>
  //     this.userService.getUserById(memberId).pipe(
  //       map(user => user ? `${user.name.first} ${user.name.last}` : ''),
  //       catchError(() => of(''))
  //     )
  //   );
  //   return forkJoin(membersNames$);
  // }


}
