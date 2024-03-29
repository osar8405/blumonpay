import { Component, OnDestroy, OnInit } from '@angular/core';
import * as dialogs from '@nativescript/core/ui/dialogs';

import { ProductosService } from '~/app/shared/productos.service';
import { Productos } from './productos.interface';
import { AndroidActivityBackPressedEventData, Application } from '@nativescript/core';
import { exit } from "nativescript-exit";
import { remove } from '@nativescript/core/application-settings';
import { RouterExtensions } from '@nativescript/angular';

@Component({
    selector: "Productos",
    moduleId: module.id,
    templateUrl: "./productos.component.html"
})

export class ProductosComponent implements OnInit {

    aProductos: Productos;

    constructor(private productosService: ProductosService, private router: RouterExtensions) {
        Application.android.off(Application.android.activityBackPressedEvent);
        Application.android.on(Application.android.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            data.cancel = true;
            this.cerrarSesion();
        });
    }

    ngOnInit(): void {
        this.consultaProductos();
    }

    consultaProductos() {
        this.productosService.consultaProductos()
            .subscribe({
                next: (data => {
                    let respuesta = JSON.parse(data);
                    this.aProductos = respuesta.products;
                }),
                error: (error => {
                    dialogs.alert({
                        title: 'Productos',
                        message: 'Error al consultar productos',
                        cancelable: false,
                        okButtonText: 'Aceptar'
                    })

                }),
                complete: () => {

                }
            });
    }

    cerrarSesion() {
        dialogs.confirm({
            title: 'Blumon Pay',
            message: '¿Desea cerrar la sesión?',
            cancelable: false,
            okButtonText: 'Si',
            cancelButtonText: 'No'
        }).then(resp => {
            if (resp) {
                remove("usuario");
                remove("contrasena");
                this.router.navigate(["/login"], { clearHistory: true });
            }
        })
    }
}