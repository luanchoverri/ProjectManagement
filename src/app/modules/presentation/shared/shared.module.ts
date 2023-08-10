import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { DetailInfoCardComponent } from './detail-info-card/detail-info-card.component';
import { MaterialModule } from '../../material/material.module';
import { CardListComponent } from './card-list/card-list.component';




@NgModule({
  declarations: [
    IconButtonComponent,
    DetailInfoCardComponent,
    CardListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    IconButtonComponent,
    DetailInfoCardComponent,
    CardListComponent
  ]
})
export class SharedModule { }
