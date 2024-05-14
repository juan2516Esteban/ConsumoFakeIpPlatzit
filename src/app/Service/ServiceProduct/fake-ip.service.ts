import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FakeIpService {
  // importante importantamos el modulo HttpClient
  constructor(private http: HttpClient) {}

  /*llamamos la ip desde el archivo environment.ts con la
  URL correspondiente*/
  public urlIpFake: any = environment.UrlFakeIpProducts;

  /*creamos un metodo para obtener los productos por medio de JSON*/
  public odtenerProductos() {
    return this.http.get(`${this.urlIpFake}`);
  }

  /* Creamos el Servicio para Crear un Producto */
  public CreateProduct(body: any) {
    return this.http.post(`${this.urlIpFake}`, body);
  }

  /* Creamos el Servicio para actualizar el Producto por medio de un ID y un BODY */
  public UpdateProduct(body: any, id: any) {
    return this.http.put(`${this.urlIpFake}/${id}`, body);
  }

  public DeleteProduct(id: any) {
    return this.http.delete(`${this.urlIpFake}/${id}`);
  }
}
