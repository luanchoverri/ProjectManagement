import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../api-rest/services/auth.service';
import { ActivatedRoute, Route } from '@angular/router';
import { UserCredentials } from '../../../models/userCredentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.onLogin();
  }

  onLogin() {
    const userData = { username: 'nina', password: '1234' };
    this.authService.login(userData).subscribe((response) => console.log('Login :)' + userData.username));
  }
}
