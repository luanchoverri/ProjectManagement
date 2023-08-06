import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatCardModule,
		MatSnackBarModule,
		MatToolbarModule,
	],
	exports: [
		MatCardModule,
		MatSnackBarModule,
		MatToolbarModule,
	]
})
export class MaterialModule {
}
