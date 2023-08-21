import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../api-rest/services/auth.service';

@Component({
  selector: 'app-user-settings-footer',
  templateUrl: './user-settings-footer.component.html',
  styleUrls: ['./user-settings-footer.component.scss'],
})

export class UserSettingsFooterComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) {
   
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {}



  logOut(){
    this.authService.logout();
  }

}
