import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LabelComponent } from './components/label/label.component';


@NgModule({
	declarations: [
	LabelComponent],
	imports: [
		CommonModule,
		FlexLayoutModule,
	],
	exports: [
		FlexLayoutModule,
	]
})
export class PresentationModule {
}
