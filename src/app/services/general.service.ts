import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oracle } from 'src/app/models/answerModel';
import { Observable } from 'rxjs';
import { User } from '../models/userModel';
import { Purchase } from '../models/purchaseModel';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  
  answer:Oracle;  

  constructor(private http: HttpClient) {
    this.answer = new Oracle;
  }

  

  getBooks(){
    return this.http.get("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/book/book");
  }

  //Petición para obtener un solo libro
  getBook(id: string | null){
    return this.http.get("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/book/book/"+id);
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
}
