import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Task } from 'src/app/modules/models/task.model';
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

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    super();
    
  }

  override getItems(id: string): Observable<Task[]> {
    return this.http.get<ApiResponse>(`${PathRest.GET_STORIES}/${id}${PathRest.GET_TASKS}`)
    .pipe(map((response) => response.data));
  }

  //no se usan por que no hay pantalla con descripcion de task
  override getItemById(id: string): Observable<Task> {
    return this.http.get<ApiResponse>(`${PathRest.GET_TASKS}/${id}`)
    .pipe(map((response) => response.data));
  }

  override getItemName(id: string): Observable<string> {
    return this.getItemById(id).pipe(
      map((task: Task) => task.name)
    );
  }
  //
  
  override createItem(item: Task): Observable<Task> {
    return this.http.post<ApiResponse>(PathRest.GET_TASKS, item)
    .pipe(map((response) => response.data));
  }
  override updateItem(item: Task): Observable<Task> {
    console.log("voy a actualizar el task");
    return new Observable<Task>;
  }

  override editItem(item: Task): void {
    throw new Error('Method not implemented.');
  }
  
  override deleteItem(id: string): Observable<Task | null> {
    return this.http
      .delete<ApiResponse>(`${PathRest.GET_TASKS}/${id}`)
      .pipe(
        map((response) => response.data),
        catchError(error => {
          return of(null);
        }),
        tap(() => {
          this.snackBar.open('Task deleted successfully.', 'Close', {
            duration: 5000,
          });
        })
      );
  }
}
