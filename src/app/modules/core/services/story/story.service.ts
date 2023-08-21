import { Injectable } from '@angular/core';
import { ListService } from '../list/list.service';
import { Story } from 'src/app/modules/models/story';
import { State } from 'src/app/modules/models/enum';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/modules/api-rest/services/auth.service';
import { PathRest } from 'src/app/modules/api-rest/enviroments/path-rest';
import { ApiResponse } from 'src/app/modules/models/apiResponse';
import { Task } from 'src/app/modules/models/task.model';
import { endpoint } from 'src/app/modules/api-rest/enviroments/endpoints';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class StoryService extends ListService<Story> {
  //datos mock
  // storyList: Story[] = [
  //   new Story(
  //     "Enhance User Onboarding Process",
  //     "Revamp the user onboarding process to improve user engagement.",
  //     8,
  //     undefined,
  //     undefined,
  //     undefined,
  //     undefined,
  //     undefined,
  //     undefined,
  //     undefined,
  //     undefined
  // ),
  //   new Story(
  //     'Upgrade Security System',
  //     'Implement advanced security measures to protect user data.',
  //     7,
  //     'Owner',
  //     ['Alice', 'Bob'],
  //     8,
  //     new Date('2023-09-01'),
  //     new Date('2023-09-15'),
  //     new Date('2023-09-02'),
  //     new Date('2023-09-14'),
  //     State.Running
  //   ),
  //   new Story(
  //     'Develop Personalized Recommendations',
  //     'Create an algorithm to provide personalized product recommendations to users.',
  //     7,
  //     'TechWizard',
  //     ['Elena', 'Oliver'],
  //     5,
  //     new Date('2023-08-15'),
  //     new Date('2023-08-31'),
  //     new Date('2023-08-20'),
  //     new Date('2023-08-30'),
  //     State.Done
  //   ),
  //   new Story(
  //     'Create Language Translation Module',
  //     'Develop a module for automatic language translation in the application.',
  //     6,
  //     'Owner',
  //     ['Sophia', 'Lucas'],
  //     3,
  //     new Date('2023-07-01'),
  //     new Date('2023-08-10'),
  //     new Date('2023-07-05'),
  //     new Date('2023-08-08'),
  //     State.Todo
  //   ),
  //   new Story(
  //     'Optimize Inventory Management',
  //     'Implement an AI-based solution to streamline inventory management.',
  //     6,
  //     'InventoryMaster',
  //     ['Grace', 'David'],
  //     1,
  //     new Date('2023-10-10'),
  //     new Date('2023-11-15'),
  //     new Date('2023-10-12'),
  //     new Date('2023-11-10'),
  //     State.Todo
  //   ),
  // ];

  storiesList$ = new Observable<Story[]>();

  constructor(
    private ls: LocalStorageService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // //carga de datos mock
    // this.ls.updateItem('stories', this.storyList);
    super();
  }

  override getItems(): Observable<Story[]> {
    return this.ls.getItem<Story[]>('stories').pipe(map((data) => data || []));
  }

  override createItem(item: Story): Observable<Story> {
    return this.http
    .post<ApiResponse>(PathRest.GET_STORIES, item)
    .pipe(map((response) => response.data));
  }

  override updateItem(item: Story): Observable<Story> {
    console.log("voy a actualizar el story");
    return new Observable<Story>;
  }

  override deleteItem(id: string): Observable<Story | null> {
    return this.getTasksByStory(id).pipe(
      switchMap(tasks => {
        if (tasks.length > 0) {
          this.snackBar.open('This story has associated tasks and cannot be deleted.', 'Close', {
            duration: 5000,
          });
          return of(null); 
        } else {
          return this.http.delete<ApiResponse>(`${PathRest.GET_STORIES}/${id}`)
            .pipe(
              map((response) => response.data),
              catchError(error => {
                return of(null);
              }),
              tap(() => {
                this.snackBar.open('Story deleted successfully.', 'Close', {
                  duration: 5000,
                });
              })
            );
        }
      })
    );
  }

  // getItemById(id: number): Story | undefined{
  //   return this.storyList.find((item) => item.id == id);
  // }

  // getStoriesByEpicId(id : number): Story[] {
  //   return this.storyList.filter(story => story.epic === id);
  // }

  getStoryById(id: string): Observable<Story> {
    // if (this.isLoggedIn) {
 
    return this.http
      .get<ApiResponse>(`${PathRest.GET_STORIES}/${id}`)
      .pipe(map((response) => response.data));
  }

  getTasksByStory(id: string): Observable<Task[]> {
    return this.http
      .get<ApiResponse>(`${PathRest.GET_STORIES}/${id}${endpoint.TASKS}`)
      .pipe(
        map((response) => response.data),
        catchError(() => of([]))
      );
  }

  getAll(): Observable<Story[]> {
  
    return this.http.get<ApiResponse>(PathRest.GET_STORIES).pipe(
      map((response) => response.data),
      catchError(() => of([])) 
    );
  }
}
