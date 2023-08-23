import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { CardListComponent } from './card-list/card-list.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemDetailsCardComponent } from './item-details-card/item-details-card.component';
import { RouterModule } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { ProjectDetailsComponent } from './details/project-details/project-details.component';
import { EpicDetailsComponent } from './details/epic-details/epic-details.component';
import { StoryDetailsComponent } from './details/story-details/story-details.component';
import { IconPickerComponent } from './icon-picker/icon-picker.component';



@NgModule({
  declarations: [
    CardListComponent,
    ItemCardComponent,
    ItemDetailsCardComponent,
    AddItemComponent,
    ConfirmationDialogComponent,
    TaskCardComponent,
    ProjectDetailsComponent,
    EpicDetailsComponent,
    StoryDetailsComponent,
    IconPickerComponent,


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
    AddItemComponent,
    TaskCardComponent,
    ProjectDetailsComponent,
    EpicDetailsComponent,
    StoryDetailsComponent,
    IconPickerComponent,

  ]
}) export class SharedModule { }