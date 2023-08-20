import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../api-rest/services/auth.service';
import { ActivatedRoute, Route } from '@angular/router';
import { UserCredentials } from '../../../models/userCredentials';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  myForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.onLogin();


    this.myForm = this.fb.group({
      username: new FormControl(''),
   //   password: new FormControl('')
    });
  }

  onLogin() {
    const userData = { username: 'luciana', password: '1234' };
    this.authService.login(userData).subscribe((response) => console.log('Login :)' + userData.username));
  }


  onSubmit() {
    
  }
}
