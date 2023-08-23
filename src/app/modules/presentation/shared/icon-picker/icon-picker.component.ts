
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent {
  
  availableIcons: string[]  = ['thumb_up', 'pets', 'cookie', 'work', 'star', 'rocket_launch', 'emoji_objects', 'favorite', 'bolt'];
  @Output() iconSelected = new EventEmitter<string>();
  @Input() currentIcon: string = '';

  selectIcon(icon: string): void {
    this.iconSelected.emit(icon);
  }



















}
