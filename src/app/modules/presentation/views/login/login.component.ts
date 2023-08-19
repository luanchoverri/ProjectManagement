import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../api-rest/services/auth.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService) {
 

  }

  ngOnInit(){
    this.onLogin();

  }


  onLogin() {
    this.authService.login('nina', '1234').subscribe(
      (response) => {
        if (response.success) {
          this.authService.setLoggedInUser(response.user, response.token);
           console.log("el usuario es ", response.user);
        } else {
        }
      },
    );
  }
}
