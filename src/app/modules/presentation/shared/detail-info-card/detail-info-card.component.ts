import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-info-card',
  templateUrl: './detail-info-card.component.html',
  styleUrls: ['./detail-info-card.component.scss']
})
export class DetailInfoCardComponent {

  @Input() element !: any; // @Input() element!: Project | Epic |any;

  

}
