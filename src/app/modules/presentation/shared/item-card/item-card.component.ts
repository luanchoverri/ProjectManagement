import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/modules/models/item.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input() item !: Item;
  @Input() service : any;
  linkSize: number = 0;
  routerLink: string = '/';
  currentLink!: string;
 
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
      this.currentLink = '/';
  }

  ngOnInit( ): void {
    
  }

  getCurrentRoute(): string {
    return this.item._id;
  }

  editItem(): void {    
    this.service.editItem(this.item);
  }

  deleteItem(item: Item): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { itemName: item.name }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.service.deleteItem(item._id).subscribe();
      }
    });
  }

}
