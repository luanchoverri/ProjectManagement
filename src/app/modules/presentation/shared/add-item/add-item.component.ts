import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent {
  @Input() formDialog: any;

  constructor(public dialog: MatDialog) {
    this.formDialog = '';
  }

  openDialog() {
    this.dialog.open(this.formDialog);
  }
}
