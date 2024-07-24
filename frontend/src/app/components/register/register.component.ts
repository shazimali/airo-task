import { Component } from '@angular/core';
import { UserRegistration } from '../../interfaces/user-registration';
import { AuthenticationService } from '../../services/authentication.service';
import { UserRegistrationErrors } from '../../interfaces/user-registration-errors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private auth:AuthenticationService){}
  loading:boolean = false;
  message:string = '';
  errorMessage:string = '';
  user:UserRegistration = {
    name:'',
    email:'',
    password:'',
    password_confirmation:''
  }
  errors:UserRegistrationErrors = {
    name:'',
    email:'',
    password:'',
  }
  onSubmit() {
  this.auth.register(this.user).subscribe(
    {
      next: (res) => {
        this.loading = true;
        this.message = JSON.stringify(res);
        this.errors = <UserRegistration>{};
        this.loading = false;
        
      },
      error: (err) => {
        this.loading = true;
        
        if(err.status == 422){
          this.errors = err.error.errors;
        }
        else{
          this.errorMessage = err;
        }

        this.loading = false;
      }
    }
  );
    
  }
}
