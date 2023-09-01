import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StoryService } from 'src/app/modules/core/services/story/story.service';
import { Task } from 'src/app/modules/models/task.model';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/modules/core/services/task/task.service';
@Component({
  selector: 'app-tasks-due-today',
  templateUrl: './tasks-due-today.component.html',
  styleUrls: ['./tasks-due-today.component.scss']
})
export class TasksDueTodayComponent implements OnInit, OnDestroy{
  
  taskList: Task[] = [];
  suscrip: Subscription = new Subscription
  displayedColumns: string[] = ['done', 'name', 'description', 'created', 'actions']; // Define las columnas que deseas mostrar
  dataSource = new  MatTableDataSource<Task>(this.taskList);;


  constructor(private ss :StoryService, private ts:TaskService) {}


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit() {
    // Asigna las tareas a la fuente de datos de la tabla
    this.suscrip = this.ss.getTasksDoneAndDueToday().subscribe(tasks => {
      this.taskList = tasks;
      this.dataSource.data = this.taskList;
      
    })
  }


  ngOnDestroy(){
    this.suscrip.unsubscribe()
  }


  updateTaskDone(task: Task){
    
    task.done = !task.done;
    this.ts.updateItem(task);
    this.ts.updateItem(task).subscribe();
  }


}
