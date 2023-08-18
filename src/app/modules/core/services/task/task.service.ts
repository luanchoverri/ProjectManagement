import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from 'src/app/modules/models/task.model';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly TASK_KEY = 'tasks';
  taskList$ = new Observable<Task[]>();

  //datos mock
  // taskList: Task[] = [
  //   new Task("Implement Translation Algorithm", "Code the translation algorithm.", '11'),
  // new Task("UI Integration", "Integrate the translation module with the user interface.", '11')
  // ]

  constructor(private ls: LocalStorageService) {
    // this.ls.updateItem(this.TASK_KEY, this.taskList);
  }

  getItems(): Observable<Task[]> {
    return this.ls.getItem<Task[]>(this.TASK_KEY).pipe(map((data) => data || []));
  }


  // getItemById(id: number): Task | undefined{
  //   return this.taskList.find((item) => item.id == id);
  // }


  // getTasksByStoryId(id : number): Task[] {
  //   return this.taskList.filter(task => task.story === id);
  // }
}
