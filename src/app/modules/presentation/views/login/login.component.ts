import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../api-rest/services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserCredentials } from '../../../models/userCredentials';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserResponse } from 'src/app/modules/models/userResponse';
import { catchError, throwError } from 'rxjs';
import { endpoint } from 'src/app/modules/api-rest/enviroments/endpoints';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  protected hide = true;
  protected myForm!: FormGroup;
  protected errorMessage: string = ''
  protected isLoading = false;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      username: new FormControl('', [ Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [ Validators.required,  Validators.minLength(4)])
    });
  }


  onSubmit() {
    if (this.myForm.valid) {
      this.isLoading = true; 
      const userData = {
        username: this.myForm.value.username,
        password: this.myForm.value.password
      };
      this.authService.login(userData)
      .pipe(
        catchError((error) => {
          this.handleError(error); 
          return [];
        })
      )
      .subscribe(
        success => {
          if (success) {
            this.router.navigate([endpoint.HOME]);
          } else {
            this.myForm.setErrors({ invalidCredentials: true } );
            this.handleError('');
          }
         
        });
    }
    
  }



  handleError(error: any) {
    this.isLoading = false;
    this.errorMessage = '*Incorrect username or password';
    console.error('Ocurrió un error durante el inicio de sesión:', error);
  }


  clearFormFields() {
    this.myForm.get('username')?.setValue('');
    this.myForm.get('password')?.setValue('');
  }
    
}


