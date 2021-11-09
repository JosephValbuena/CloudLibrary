import { Injectable } from "@angular/core";
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(private router: Router){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        //debugger;
        const token = localStorage.getItem('token');
        
        if(token){
            return true;
        }

        console.log("Debes iniciar sesión para continuar");

        this.router.navigate(['/home']);
        
        return false;
    }
}