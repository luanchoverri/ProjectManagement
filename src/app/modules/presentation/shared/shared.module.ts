import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { CardListComponent } from './card-list/card-list.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemDetailsCardComponent } from './item-details-card/item-details-card.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CardListComponent,
    ItemCardComponent,
    ItemDetailsCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    CardListComponent,
    ItemCardComponent,
    ItemDetailsCardComponent
  ]
})
export class SharedModule { }
