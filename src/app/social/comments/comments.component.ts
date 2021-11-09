import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { Comment } from '../../models/commentModel'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  
  local: string | null = "";
  userData: any;
  openForm = false;
  comentarios: Comment[] = [];
  form:Comment = {
    id:0,
    idusuario: 0,
    nombreusuario: "",
    comentario: "",
    datecomment: new Date(),
    tittle: ""
  }

  constructor(private service: GeneralService) { }

  ngOnInit(): void {
    this.service.getObsComments().subscribe((comments:any) => {
      this.comentarios = comments;
      for(let i=0; i< comments.length; i++){
        if(this.form.id < comments[i].id){
          this.form.id = comments[i].id;
        }
      }

      //console.log(comments);

      this.form.id = this.form.id + 1;

    });

    this.local = localStorage.getItem("idUser");

    if(this.local){
      this.userData = JSON.parse(this.local);
      this.form.idusuario = this.userData.id;
      this.form.nombreusuario = this.userData.name + ' ' + this.userData.lastname;
    }
  }

  addComment(){
    if(!(this.form.tittle === "" || this.form.comentario == "")){
      this.service.addComment(this.form).subscribe(data =>{
        Swal.fire({
          icon:'success',
          title: 'Hecho',
          text: 'El comentario ha sido agregado'
        });
        window.location.reload();
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No puedes enviar un comentario sin título o comentario',
      })
    }
  }
  
}
