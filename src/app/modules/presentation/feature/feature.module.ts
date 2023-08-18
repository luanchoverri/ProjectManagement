import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './menu/nav/nav.component';
import { LogoHeaderComponent } from './menu/logo-header/logo-header.component';
import { UserSettingsFooterComponent } from './menu/user-settings-footer/user-settings-footer.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MenuComponent,
    LogoHeaderComponent,
    NavComponent,
    UserSettingsFooterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    MenuComponent,
  ]
})
export class FeatureModule { }
