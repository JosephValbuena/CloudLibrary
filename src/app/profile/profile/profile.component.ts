import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/userModel';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: User;
  openEdit = false;
  numero: number | undefined = 0;
  email: string | undefined = "";

  editForm:User = {
    id: this.numero,
    email:this.email,
    name: "",
    lastname: "",
    passw: ""
  }

  constructor(private router:Router, private actualRoute: ActivatedRoute, private service:GeneralService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.actualRoute.paramMap.subscribe(params => {
      if(params.has('id')){
        this.service.getUserById(params.get('id')).subscribe((user:any)=>{
          this.user = user.items[0];
          console.log(this.user)
          this.editForm.id = this.user.id;
          this.editForm.email = this.user.email;
        });
      }
    });
  }

  editUser(){
    this.openEdit = true;
  }

  validateForm(){
    console.log(this.editForm);
    this.service.putUser(this.editForm)
    //location.reload();
  }

}
