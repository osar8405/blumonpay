import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { ProductosComponent } from './productos.component'

const routes: Routes = [{ path: '', component: ProductosComponent }]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})

export class ProductosRoutingModule {
}
