import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../api-rest/services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserCredentials } from '../../../models/userCredentials';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserResponse } from 'src/app/modules/models/userResponse';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  hide = true;
  myForm!: FormGroup;
  errorMessage: string = ''
  loginFailed = false;
  failedIcon = 'mood'

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    


    this.myForm = this.fb.group({
      username: new FormControl('', [ Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [ Validators.required,  Validators.minLength(4)])
    });
  }

  // onLogin(userData : UserCredentials) {
  //   this.authService.login(userData).subscribe(
  //     (response) => {
  //       console.log(response);
  //       if (response){
  //         console.log(response);
  //          this.router.navigate(['/home']);
  //       }
  //       else {
         
  //         this.myForm.setErrors({ invalidCredentials: true });
  //       }
  //     },
  //     error => {
  //       console.error(error);
  //     });
  // }

  isLoading = false;

  onSubmit() {
    if (this.myForm.valid) {
      this.isLoading = true; // Activar el estado de carga
      const userData = {
        username: this.myForm.value.username,
        password: this.myForm.value.password
      };
  
      this.authService.login(userData)
      .pipe(
        catchError((error) => {
          this.handleError(error); // Función para manejar el error
          return [];
        })
      )
      .subscribe(
        success => {
          if (success) {
            this.router.navigate(['/home']);
          } else {
            this.myForm.setErrors({ invalidCredentials: true } );
            this.handleError('');
          }
         
        });
    }
    
  }



  handleError(error: any) {
  //  throw new Error(error);
    this.loginFailed = true
    this.isLoading = false; // Desactivar el estado de carga
    
    this.errorMessage = '*Incorrect username or password';
    console.error('Ocurrió un error durante el inicio de sesión:', error);
  }


  clearFormFields() {
    this.myForm.get('username')?.setValue('');
    this.myForm.get('password')?.setValue('');
  }
    
}


