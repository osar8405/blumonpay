import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { ProductosRoutingModule } from './productos-routing.module'
import { ProductosComponent } from './productos.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    ProductosRoutingModule
  ],
  declarations: [ProductosComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductosModule {}