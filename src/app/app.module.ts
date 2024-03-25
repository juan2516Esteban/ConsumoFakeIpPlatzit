import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/*IMPORTANTE tenemos que importar el modulo HttpClientModule
para consumir una API*/
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetFakeIpComponent } from './Components/get-fake-ip/get-fake-ip.component';
import { CreateProductComponent } from './Components/CreateProduct/create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActualizarProductoComponent } from './Components/actualizar-producto/actualizar-producto.component';
import { DeleteProductComponent } from './Components/delete-product/delete-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    GetFakeIpComponent,
    CreateProductComponent,
    ActualizarProductoComponent,
    ActualizarProductoComponent,
    DeleteProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
