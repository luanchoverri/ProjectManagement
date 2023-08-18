import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from 'src/app/modules/models/task.model';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { ListService } from '../list/list.service';

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

  constructor(private ls: LocalStorageService) {
    // this.ls.updateItem(this.TASK_KEY, this.taskList);
    super();
  }

  override getItems(): Observable<Task[]> {
    return this.ls.getItem<Task[]>(this.TASK_KEY).pipe(map((data) => data || []));
  }

  override createItem(item: Task): Observable<Task> {
    throw new Error('Method not implemented.');
  }
  override updateItem(item: Task): Observable<Task> {
    console.log("voy a actualizar el task");
    return new Observable<Task>;
  }
  override deleteItem(id: string): Observable<Task> {
    console.log("voy a borrar el task");
    return new Observable<Task>;
  }


  // getItemById(id: number): Task | undefined{
  //   return this.taskList.find((item) => item.id == id);
  // }


  // getTasksByStoryId(id : number): Task[] {
  //   return this.taskList.filter(task => task.story === id);
  // }
}
