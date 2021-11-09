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
  check = 0;
  constructor(private service: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      console.log("sirvo");
      this.router.navigate(['/home']);
    }
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
          localStorage.setItem("token",JSON.stringify(users.items[i].token));
          this.router.navigate(['/home']);
        }
      }

      if(!localStorage.getItem("token")){
        alert("Revisa tus credenciales o regístrate")
      }
    })
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}
