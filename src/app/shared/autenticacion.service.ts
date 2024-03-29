import { Injectable, NgZone } from '@angular/core';
import { LoginService } from './login.service';
import * as dialogs from '@nativescript/core/ui/dialogs';
import { getString } from '@nativescript/core/application-settings';

@Injectable({ providedIn: 'root' })
export class AutenticacionService {

    usuario: any = getString('usuario') ? getString('usuario') : '';
    contrasena: any = getString('contrasena') ? getString('contrasena') : '';

    constructor(private loginService: LoginService, private zone: NgZone) { 
        this.getAutenticacion();
    }


getAutenticacion() {
    this.loginService.validaAcceso(this.usuario, this.contrasena)
        .subscribe({
            next: (data) => {
                //token generado
            },
            error: (error) => {
                dialogs.alert({
                    title: '',
                    message: 'No se pudo realizar la operación, intente nuevamente.',
                    cancelable: false,
                    okButtonText: 'Aceptar'
                });
            },
            complete: () => { 
            }
        });
}
}