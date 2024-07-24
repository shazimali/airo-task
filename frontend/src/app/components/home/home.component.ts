import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user = localStorage.getItem('user');
  loading:boolean = false

  constructor(private auth:AuthenticationService ,private router:Router) {}

  onSubmit(){
    this.auth.logout().subscribe({
      
      next:(res)=>{
        this.router.navigate(['/login']);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      },
      error:(err)=>{
        this.loading = true;
        console.log(err);
        this.loading = false;
      }
    })
  }
}
