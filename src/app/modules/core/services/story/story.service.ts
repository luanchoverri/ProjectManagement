import { Injectable } from '@angular/core';
import { ListService } from '../list/list.service';
import { Story } from 'src/app/modules/models/story';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/modules/api-rest/services/auth.service';
import { PathRest } from 'src/app/modules/api-rest/enviroments/path-rest';
import { ApiResponse } from 'src/app/modules/models/apiResponse';
import { Task } from 'src/app/modules/models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { StoryFormComponent } from 'src/app/modules/presentation/feature/forms/story-form/story-form.component';

@Injectable({
  providedIn: 'root',
})
export class StoryService extends ListService<Story> {
  storiesList$ = new Observable<Story[]>();

  constructor(
    private ls: LocalStorageService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
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

  editItem(story: Story): void {
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

  getStoryById(id: string): Observable<Story> {
    return this.http
      .get<ApiResponse>(`${PathRest.GET_STORIES}/${id}`)
      .pipe(map((response) => response.data));
  }

  getTasksByStory(id: string): Observable<Task[]> {
    return this.http.get<ApiResponse>(`${PathRest.GET_TASKS}`).pipe(
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
