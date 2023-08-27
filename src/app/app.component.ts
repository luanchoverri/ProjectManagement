import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './modules/core/services/theme/theme.service';

const DEFAULT_LANG = 'es-AR';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  constructor(private ts: ThemeService){}
 
  ngOnInit(): void {
    
   this.ts.setDarkTheme(this.ts.isDark);
  }

}
