import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { ConfiguraAPI } from "./configuraAPI";


@Injectable({ providedIn: 'root' })

export class ProductosService {

    constructor(private http: HttpClient,) {

    }

    consultaProductos() {
        return this.http.get(
            ConfiguraAPI.APIREST_URL + 'products',
            { headers: ConfiguraAPI.getCommonHeadersRest() },
        )
            .pipe(
                map(response => JSON.stringify(response)),
                catchError(ConfiguraAPI.handleErrors)
            )
    }
}