import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oracle } from 'src/app/models/answerModel';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/userModel';
import { Purchase } from '../models/purchaseModel';
import { Comment } from '../models/commentModel';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  
  answer:Oracle; 
  private comments: [];
  private comments$: Subject<[]>;

  constructor(private http: HttpClient) {
    this.answer = new Oracle;
    this.comments = [];
    this.comments$ = new Subject<[]>();
  }

  

  getBooks(){
    return this.http.get("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/book/book");
  }

  //Petición para obtener un solo libro
  getBook(id: string | null){
    return this.http.get("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/book/book/"+id);
  }

  //Petición para obtener todos los usuarios
  getUsers(){
    return this.http.get("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/user/user");
  }

  //Petición GET para obtener un usuario por id
  getUserById(id: string | null){
    return this.http.get("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/user/user/"+id);
  }

  //Petición PUT para editar un usuario
  putUser(user: User){
    console.log(user);
    this.http.put("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/user/user",user).subscribe(users =>{
      console.log(users);
    });
  }

  //COMPRAS

  //Petición GET para obtener todas las compras
  getPurchases(){
    return this.http.get("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/purchase/purchase");
  }

  //Petición GET para traer compras específicas
  getCustomPurchase(id: string | null){
    return this.http.get("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/purchase/purchase/"+id);
  }

  //Petición POST para crear una nueva compra
  postPurchase(purchase: Purchase){
    console.log(purchase);
    return this.http.post("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/purchase/purchase",purchase);
  }


  //COMENTARIOS

  //Petición GET para traer todos los comentarios
  getComments(){
    this.http.get("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/comments/comments").subscribe((data:any) =>{
      this.comments = data.items;
      this.comments$.next(this.comments);
    });
  }

  getObsComments() {
    this.getComments();
    return this.comments$.asObservable();
  }

  //Petición POST para crear un comentario
  addComment(comment: Comment){
    return this.http.post("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/comments/comments",JSON.stringify(comment));
  }
}
