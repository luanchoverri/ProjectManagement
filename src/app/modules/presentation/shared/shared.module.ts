import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { DetailInfoCardComponent } from './detail-info-card/detail-info-card.component';
import { MaterialModule } from '../../material/material.module';




@NgModule({
  declarations: [
    IconButtonComponent,
    DetailInfoCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    IconButtonComponent
  ]
})
export class SharedModule { }
