import { Injectable } from '@angular/core';
import { ListService } from '../list/list.service';
import { Story } from 'src/app/modules/models/story';
import {
  BehaviorSubject,
  Observable,
  catchError,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PathRest } from 'src/app/modules/api-rest/enviroments/path-rest';
import { endpoint } from 'src/app/modules/api-rest/enviroments/endpoints';
import { ApiResponse } from 'src/app/modules/models/apiResponse';
import { Task } from 'src/app/modules/models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { StoryFormComponent } from 'src/app/modules/presentation/feature/forms/story-form/story-form.component';
import { Status } from 'src/app/modules/models/enum';

@Injectable({
  providedIn: 'root',
})
export class StoryService extends ListService<Story> {
  private storiesSubject = new BehaviorSubject<Story[]>([]);
  stories$ = this.storiesSubject.asObservable();
  filterStatus: Status | undefined;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    super();
  }

  /**
   *   Para obtener la cantidad de historias en un estado especifico -> lo usa el donut
   */

  getStoriesCountByStatus(status: Status): Observable<number> {
    return this.stories$.pipe(
      map(
        (stories) => stories.filter((story) => story.status === status).length
      )
    );
  }

  /**
   *  Para obtener la cantidad de puntos recolectados en historias en done
   */
  //
  getTotalPointsInDone$(): Observable<number> {
    return this.storiesSubject.pipe(
      map((stories) => stories.filter((story) => story.status === Status.Done)),
      map((doneStories) =>
        doneStories.reduce(
          (totalPoints, story) => totalPoints + story.points,
          0
        )
      )
    );
  }

  /**
   * Obtiene la cantidad de tareas en done
   */
  getTotalDoneTasksCount(): Observable<number> {
    return this.storiesSubject.pipe(
      switchMap((stories) =>
        forkJoin(
          stories.map((story) =>
            this.getTasksByStory(story._id).pipe(
              map((tasks) => tasks.filter((task) => task.done === true))
            )
          )
        )
      ),
      map((doneTasksArray) =>
        doneTasksArray.reduce((total, tasks) => total + tasks.length, 0)
      )
    );
  }

  /**
   * Obtiene las tareas asignadas a las user stories del usuario que tienen done=false y vencen hoy
   */
  getTasksdDueToday(): Observable<Task[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return this.stories$.pipe(
      switchMap((stories) =>
        forkJoin(
          stories.map((story) =>
            this.getTasksByStory(story._id).pipe(
              map((tasks) => {
                //descarta las que estan en done o no tienen due date
                const filteredTasks = tasks.filter((task) => {  
                  if ((task.done != undefined && task.done) || !task.due) {
                    return false;
                  }

                  // Compara las fechas sin horas, minutos y segundos
                  const taskDueDate = new Date(task.due);
                  const taskDueDateGMT = new Date(taskDueDate.toISOString());
                  console.log(taskDueDateGMT);
                  taskDueDate.setHours(0, 0, 0, 0);

                  // Compara solo las fechas sin importarle la hora ni la zona horaria
                  return taskDueDateGMT >= today && taskDueDateGMT < tomorrow;
                });

                return filteredTasks;
              })
            )
          )
        )
      ),
      map((tasksArray) =>
        tasksArray.reduce((allTasks, tasks) => allTasks.concat(tasks), [])
      )
    );
  }

  set filterStatusValue(value: Status | undefined) {
    this.filterStatus = value;
  }

  get filterStatusValue(): Status | undefined {
    return this.filterStatus;
  }

  //abstract methods
  override getAllItems(): Observable<Story[]> {
    this.http
      .get<ApiResponse>(PathRest.GET_STORIES)
      .pipe(map((response) => response.data))
      .subscribe({
        next: (stories) => {
          stories.sort((a: any, b: any) => b._id.localeCompare(a._id));
          if (this.filterStatus) {
            stories = stories.filter(
              (story: { status: Status }) => story.status === this.filterStatus
            );
          }
          if (this.storiesSubject) {
            this.storiesSubject.next(stories);
          }
        },
      });
    return this.stories$;
  }

  override getItems(id: string): Observable<Story[]> {
    this.http
      .get<ApiResponse>(`${PathRest.GET_EPICS}/${id}${endpoint.STORIES}`)
      .pipe(
        map((response) => response.data),
        catchError(() => of([]))
      )
      .subscribe({
        next: (stories) => {
          stories.sort((a: any, b: any) => b._id.localeCompare(a._id));
          if (this.storiesSubject) {
            this.storiesSubject.next(stories);
          }
        },
      });
    return this.stories$;
  }

  override getItemById(id: string): Observable<Story> {
    return this.http
      .get<ApiResponse>(`${PathRest.GET_STORIES}/${id}`)
      .pipe(map((response) => response.data));
  }

  override getItemName(id: string): Observable<string> {
    return this.getItemById(id).pipe(map((story: Story) => story.name));
  }

  override createItem(item: Story): Observable<Story> {
    return this.http
      .post<ApiResponse>(PathRest.GET_STORIES, item)
      .pipe(map((response) => response.data));
  }

  override editItem(story: Story): void {
    const dialogRef = this.dialog.open(StoryFormComponent, {
      data: { initialValues: story },
    });

    dialogRef.componentInstance.toggleIsEditing();
  }

  override updateItem(item: Story): Observable<Story | null> {
    return this.http
      .put<ApiResponse>(`${PathRest.GET_STORIES}/${item._id}`, item)
      .pipe(
        map((response) => response.data),
        catchError(() => of(null))
      );
  }

  override deleteItem(id: string): Observable<Story | null> {
    return this.getTasksByStory(id).pipe(
      switchMap((tasks) => {
        if (tasks.length > 0) {
          this.snackBar.open(
            'This story has associated tasks and cannot be deleted.',
            'Close',
            {
              duration: 5000,
            }
          );
          return of(null);
        } else {
          return this.http
            .delete<ApiResponse>(`${PathRest.GET_STORIES}/${id}`)
            .pipe(
              map((response) => response.data),
              catchError((error) => {
                console.log(error);
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

  //sirve para el delete que saber si tiene tasks asociadas
  getTasksByStory(id: string): Observable<Task[]> {
    return this.http
      .get<ApiResponse>(`${PathRest.GET_STORIES}/${id}${endpoint.TASKS}`)
      .pipe(
        map((response) => response.data),
        catchError(() => of([]))
      );
  }
}
