import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ConfiguraAPI {

    public static APIREST_URL = 'https://dummyjson.com/auth/';

    public static idToken: string;


    public static getCommonHeadersRest() {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + ConfiguraAPI.idToken
        };
    }

    public static handleErrors(error: HttpErrorResponse) {
        console.log(JSON.stringify(error));
        return throwError(() => JSON.stringify(error));
    }

    // public static handleErrorsAutentificacion(error: HttpErrorResponse) {
    //     console.log(JSON.stringify(error));
    //     if (error.status === 0 || error.status >= 403) {
    //         return ("");
    //     }
    // }
}