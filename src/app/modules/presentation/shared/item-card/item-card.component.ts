import { Component, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/modules/models/item.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import {
  LIST_SERVICE_TOKEN,
  ListService,
} from 'src/app/modules/core/services/list/list.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
  @Input() item!: Item;

  constructor(
    @Inject(LIST_SERVICE_TOKEN) public service: ListService<Item>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  getCurrentRoute(): string {
    return this.item._id;
  }

  editItem(): void {
    this.service.editItem(this.item);
  }

  deleteItem(item: Item): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { itemName: item.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.service.deleteItem(item._id).subscribe(
          {
            next: (item) => {
              this.service.getItems().subscribe();
            }
          }
        );
      }
    });
  }
}
