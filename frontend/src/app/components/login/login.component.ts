import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserLogin } from '../../interfaces/user-login';
import { UserLoginErrors } from '../../interfaces/user-login-errors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private auth:AuthenticationService, private router:Router){}
  
  loading:boolean = false;
  errorMessage:string = '';

  user:UserLogin = {
    email:'',
    password:'',
  }
  errors:UserLoginErrors = {
    email:'',
    password:'',
  }
  onSubmit() {
  this.auth.login(this.user).subscribe(
    {
      next: (res:any) => {
        this.loading = true;
        localStorage.setItem('user',res.user);
        localStorage.setItem('token',res.token);
        this.loading = false;
        
        this.router.navigate(['/']);
        
      },
      error: (err:any) => {
        this.loading = true;
        
        if(err.status == 422){
          this.errors = err.error.errors;
        }
        else{
          this.errorMessage = JSON.stringify(err.statusText) ;
          this.errors = <UserLoginErrors>{};
        }

        this.loading = false;
      }
    }
  );
    
  }
}
