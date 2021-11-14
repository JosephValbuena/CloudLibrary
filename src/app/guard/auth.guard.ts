import { Injectable } from "@angular/core";
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import Swal from "sweetalert2";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(private router: Router){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        //debugger;
        const token = localStorage.getItem('token');
        
        if(token){
            return true;
        }

        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Debes iniciar sesión para continuar',
            timer: 1500
          })

        this.router.navigate(['/home']);
        
        return false;
    }
}