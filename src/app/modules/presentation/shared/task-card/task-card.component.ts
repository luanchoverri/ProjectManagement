import { Component, Input } from '@angular/core';
import { TaskService } from 'src/app/modules/core/services/task/task.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task: any;

  constructor(private ts: TaskService, private dialog: MatDialog) {}

  editTask() {
    console.log('edit task');
  }

  deleteTask() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { itemName: this.task.name }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.ts.deleteItem(this.task._id).subscribe();
      }
    });
  }

  togleDone(){
    this.task.done = !this.task.done;
    this.ts.updateItem(this.task);
    this.ts.updateItem(this.task).subscribe();
  }

}
