import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  file:File = new File([],"");
  token = "";
  user = {};
  id = 0;

  constructor(private service: AuthServiceService,private general: GeneralService, private router: Router) { 
  }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      console.log("sirvo");
      this.router.navigate(['/home']);
    }
  }

  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    passw: new FormControl('',[Validators.required]),
    confirmPassword: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    avatar: new FormControl('')
  });

  register(){
    console.log(this.registerForm.value);
    if(this.registerForm.value.passw === this.registerForm.value.confirmPassword){
      this.general.getUsers().subscribe((users:any) =>{
        for(let i=0; i<users.items.length; i++){
          if(this.id < users.items[i].id){
            this.id = users.items[i].id;
          }
        }

        this.id = this.id + 1;

        this.user = {
          'id': this.id,
          'name': this.registerForm.value.name,
          'lastname': this.registerForm.value.lastname,
          'email': this.registerForm.value.email,
          'passw': this.registerForm.value.passw,
          'description':this.registerForm.value.description,
          'avatar': "",
          'token': `miToken${this.id}`
        }

        this.service.sendNewUser(this.user).subscribe(data=>{
          this.router.navigate(['/login']);
        });
      });
    }else{
      alert("Las claves no coinciden");
    }
  }

  onPhotoSelected(event:any):void {
    if(event.target.files && event.target.files[0]){
      this.file = <File> event.target.files[0];
      //console.log(this.file);
    }
  }

}
