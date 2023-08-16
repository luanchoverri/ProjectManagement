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
    this.authService.login('thomas', '1234').subscribe(
      (response) => {
        if (response.success) {
          // Almacenar la información del usuario en el servicio de autenticación
          this.authService.setLoggedInUser(response.user, response.token);
          console.log("el usuario es ", response.user);
          // Redirigir al usuario a otra página
          //this.router.navigate(['/home']); //  la página principal
        } else {
          // Mostrar mensaje de error al usuario
        }
      },
    );
  }
}
