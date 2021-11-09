import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  private usuarios: User[];
  private usuarios$: Subject<User[]>

  constructor(private http: HttpClient) {
    this.usuarios = [];
    this.usuarios$ = new Subject<User[]>();
  }

  //Enviar petición al servidor para saber si está en la BD
  auth():Observable<any>{
    return this.http.get("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/user/user");
  }

  //Petición para registrar un nuevo usuario
  sendNewUser(user: any):Observable<any>{
    return this.http.post("https://gfc2a689900fbad-db202110301433.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/user/user",JSON.stringify(user));
  }
}
