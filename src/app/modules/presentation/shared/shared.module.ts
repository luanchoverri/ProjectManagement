import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { CardListComponent } from './card-list/card-list.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemDetailsCardComponent } from './item-details-card/item-details-card.component';
import { RouterModule } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    CardListComponent,
    ItemCardComponent,
    ItemDetailsCardComponent,
    AddItemComponent,
    ConfirmationDialogComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    CardListComponent,
    ItemCardComponent,
    ItemDetailsCardComponent,
    AddItemComponent
  ]
})
export class SharedModule { }
