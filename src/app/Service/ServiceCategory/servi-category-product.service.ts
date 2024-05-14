import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiCategoryProductService {

  constructor(private http: HttpClient) { 
  }

  public ApiCategory: any = environment.ApiCategory;

  public ObtenerCategorias() {
    return this.http.get(`${this.ApiCategory}`)
  }


}
