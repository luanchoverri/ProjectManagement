import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Task } from 'src/app/modules/models/task.model';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { ListService } from '../list/list.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/modules/models/apiResponse';
import { PathRest } from 'src/app/modules/api-rest/enviroments/path-rest';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends ListService<Task> {
  private readonly TASK_KEY = 'tasks';
  taskList$ = new Observable<Task[]>();

  //datos mock
  // taskList: Task[] = [
  //   new Task("Implement Translation Algorithm", "Code the translation algorithm.", '11'),
  // new Task("UI Integration", "Integrate the translation module with the user interface.", '11')
  // ]

  constructor(
    private ls: LocalStorageService, 
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    // this.ls.updateItem(this.TASK_KEY, this.taskList);
    super();
  }

  override getItems(): Observable<Task[]> {
    // return this.ls.getItem<Task[]>(this.TASK_KEY).pipe(map((data) => data || []));
    return this.http.get<ApiResponse>(PathRest.GET_TASKS)
    .pipe(map((response) => response.data));
  }

  override createItem(item: Task): Observable<Task> {
    return this.http.post<ApiResponse>(PathRest.GET_TASKS, item)
    .pipe(map((response) => response.data));
  }
  override updateItem(item: Task): Observable<Task> {
    console.log("voy a actualizar el task");
    return new Observable<Task>;
  }
  
  override deleteItem(id: string): Observable<Task | null> {
    return this.http
      .delete<ApiResponse>(`${PathRest.GET_PROJECTS}/${id}`)
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
}
