import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap, catchError } from "rxjs/operators";
import { ConfiguraAPI } from "./configuraAPI";
import { getString } from '@nativescript/core/application-settings';

@Injectable({ providedIn: 'root' })

export class LoginService {

    usuario: any = getString('usuario');
    contrasena: any = getString('contrasena');

    constructor(private http: HttpClient,) {
        this.getAuthentication();
    }

    getAuthentication() {
        if (this.usuario && this.contrasena) {
            return this.http.post(
                ConfiguraAPI.APIREST_URL + "login",
                {
                    username: this.usuario,
                    password: this.contrasena
                },
            )
                .pipe(
                    tap(data => {
                        let datas = JSON.stringify(data);
                        ConfiguraAPI.idToken = JSON.parse(datas).token;
                    }),
                    catchError(ConfiguraAPI.handleErrors))
        }
    }

    validaAcceso(usuario: string, contrasenia: string) {
        return this.http.post(
            ConfiguraAPI.APIREST_URL + 'login',
            {
                username: usuario,
                password: contrasenia
            },
            { headers: ConfiguraAPI.getCommonHeadersRest() },
        )
            .pipe(
                map(response => JSON.stringify(response)),
                catchError(ConfiguraAPI.handleErrors)
            )
    }
}