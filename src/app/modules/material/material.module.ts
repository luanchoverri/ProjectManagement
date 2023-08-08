import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatCardModule,
		MatSnackBarModule,
		MatToolbarModule,
		MatSidenavModule,
	],
	exports: [
		MatCardModule,
		MatSnackBarModule,
		MatToolbarModule,
		MatSidenavModule,
	]
})
export class MaterialModule {
}
