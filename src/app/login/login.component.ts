import { Component, NgZone, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import * as dialogs from '@nativescript/core/ui/dialogs';
import { getString, setString } from '@nativescript/core/application-settings';
import { LoginService } from '~/app/shared/login.service';
import { ConfiguraAPI } from '~/app/shared/configuraAPI';

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})

export class LoginComponent implements OnInit {

    usuario: any;
    contrasena: any;
    loginUsuario: any;
    hayCredenciales = false;

    constructor(page: Page, private router: RouterExtensions, private zone: NgZone, private loginService: LoginService) {
        page.actionBarHidden = true;
    }

    ngOnInit(): void {
        this.hayCredenciales = true;
        this.entrar();
    }

    entrar() {
        this.usuario = "";
        this.contrasena = "";
        this.hayCredenciales = false;
        if (getString("usuario") && getString("contrasena")) {
            this.hayCredenciales = true;
            this.usuario = getString("usuario");
            this.contrasena = getString("contrasena");
            this.login();
        }
    }

    login() {
        this.loginService.validaAcceso(this.usuario, this.contrasena).
            subscribe({
                next: (data => {
                    let acceso = JSON.parse(data);
                    if (acceso) {
                        setString("usuario", this.usuario);
                        setString("contrasena", this.contrasena);
                        this.loginUsuario = acceso;
                        ConfiguraAPI.idToken = acceso.token
                        this.ingresar();
                    } else {
                        dialogs.alert({
                            title: 'Blumon Pay',
                            message: 'Usuario o contraseña incorrectos, intente nuevamente por favor',
                            okButtonText: 'Aceptar',
                            cancelable: false
                        })
                    }
                }),
                error: (error => {
                    dialogs.alert({
                        title: 'Blumon Pay',
                        message: JSON.parse(error).error.message,
                        okButtonText: 'Aceptar',
                        cancelable: false
                    })
                })
            })
    }

    ingresar() {
        this.router.navigate(["/productos"], { clearHistory: true });
    }
}