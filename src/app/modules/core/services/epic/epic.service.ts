import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Epic } from 'src/app/modules/models/epic.model';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/modules/models/apiResponse';
import { Story } from 'src/app/modules/models/story';
import { PathRest } from 'src/app/modules/api-rest/enviroments/path-rest';
import { endpoint } from 'src/app/modules/api-rest/enviroments/endpoints';
import { ListService } from '../list/list.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class EpicService extends ListService<Epic>{
  private readonly EPIC_KEY = 'epics';
  private epicsList$ = new Observable<Epic[]>();
  
  // private project1 = new Project('Project 1', ['User 1', 'User 2'], 'Description 1', 'icon');

  // epicsList: Epic[] = [
  //   new Epic('Epic - Increase User Engagement', 'Develop new features to enhance user engagement and interaction with the platform.', 1, 'icon'),
  //   new Epic('Epic - Mobile App Optimization', 'Optimize the mobile app for better performance, smoother navigation, and improved user experience.', 1, 'icon'),
  //   new Epic('Epic -  Integration with Third-Party Services', 'Integrate the application with external services to provide additional functionality and data exchange', 0, 'icon')
  // ];

  constructor(
    private storage: LocalStorageService, 
    private http:HttpClient,
    private snackBar: MatSnackBar
  ) {
    // this.storage.updateItem(this.EPIC_KEY, this.epicsList);  
    super();
  }

  override getItems(): Observable<Epic[]> {
    throw new Error('Method not implemented.');
  }
  override createItem(item: Epic): Observable<Epic> {
    return this.http
    .post<ApiResponse>(PathRest.GET_EPICS, item)
    .pipe(map((response) => response.data));
  }
  override updateItem(item: Epic): Observable<Epic> {
    console.log("voy a actualizar el epic");
    return new Observable<Epic>;
  }
  
  override deleteItem(id: string): Observable<Epic | null> {
    return this.getStoriesByEpic(id).pipe(
      switchMap(stories => {
        if (stories.length > 0) {
          this.snackBar.open('This epic has associated stories and cannot be deleted.', 'Close', {
            duration: 5000,
          });
          return of(null); 
        } else {
          return this.http.delete<ApiResponse>(`${PathRest.GET_EPICS}/${id}`)
            .pipe(
              map((response) => response.data),
              catchError(error => {
                return of(null);
              }),
              tap(() => {
                this.snackBar.open('Epic deleted successfully.', 'Close', {
                  duration: 5000,
                });
              })
            );
        }
      })
    );
  }

  // API 
  getEpicById(id: string): Observable<Epic> {
      return this.http.get<ApiResponse>(`${PathRest.GET_EPICS}/${id}`).pipe(
        map(response => response.data)
      );

  }
  
  getStoriesByEpic(id: string): Observable<Story[]> {

    return this.http.get<ApiResponse>(`${PathRest.GET_EPICS}/${id}${endpoint.STORIES}`).pipe(
      map(response => response.data),
      catchError(() => of([])) 
    );
  
  }


  // STORAGE

  // public getEpicsByProjectId(projectId: number): Observable<Epic[]> {
  //   return this.storage.getItem<Epic[]>(this.EPIC_KEY).pipe(
  //     map((epics: Epic[] | undefined) => {
  //       if (epics) {
  //         return epics.filter(epic => epic.project.id === projectId);
  //       } else {
  //         return [];
  //       }
  //     })
  //   );
  // }
  // public getEpicsByProjectId(projectId: number): Observable<Epic[]> {
  //   console.log(projectId)
  //   console.log(this.epicsList$.pipe(
  //     //map(epics => epics.filter(epic => epic.project.id === projectId))
  //     map(epics => epics.filter(epic => epic.project === projectId))
  //   ));
  //   return this.epicsList$.pipe(
  //     //map(epics => epics.filter(epic => epic.project.id === projectId))
  //     map(epics => epics.filter(epic => epic.project === projectId))
  //   );


  // }


  // public getEpicsByProjectId(projectId: number): Epic[] {
  //   return this.epicsList.filter(epic => epic.project === projectId);
  // }
  

  // getItemById(id: number): Epic | undefined{
  //   return this.epicsList.find((item) => item.id == id);
  // }
  
}
