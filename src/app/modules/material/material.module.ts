import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatCardModule,
		MatSnackBarModule,
		MatToolbarModule,
		MatSidenavModule,
		MatIconModule,
		MatButtonModule,
		MatListModule,
		MatExpansionModule		
	],
	exports: [
		MatCardModule,
		MatSnackBarModule,
		MatToolbarModule,
		MatSidenavModule,
		MatIconModule,
		MatButtonModule,
		MatListModule,
		MatExpansionModule

	]
})
export class MaterialModule {
}
