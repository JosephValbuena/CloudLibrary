import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  credentials = {};
  constructor(private service: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  verifyLogin(){
    
    this.service.auth().subscribe(users =>{
      for (let i = 0; i < users.items.length; i++) {
        if(users.items[i].email == this.loginForm.value.email && users.items[i].passw == this.loginForm.value.password) {
          
          localStorage.setItem("idUser", JSON.stringify(users.items[i]));
          this.router.navigate(['/home']);
          location.reload();
        }else{
          alert("Revisa tus credenciales")
        }
      }
    })
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}
