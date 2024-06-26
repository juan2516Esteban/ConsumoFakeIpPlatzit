import { Component } from '@angular/core';
import { FakeIpService } from 'src/app/Service/ServiceProduct/fake-ip.service';
import {ServiCategoryProductService} from 'src/app/Service/ServiceCategory/servi-category-product.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  constructor(private serviceProduct: FakeIpService , private serviceCategory: ServiCategoryProductService) {}

  ngOnInit(): void {
    this.GetCategory();
  }

  public data: any;
  public categoria: string = "Categoria";

  public CreateProduct() {
    let body = {
      title: this.formProduct.get('title')?.value,
      price: this.formProduct.get('price')?.value,
      description: this.formProduct.get('description')?.value,
      categoria: this.formProduct.get('categoria')?.value,
      images: [this.formProduct.get('images')?.value],
    };

    console.log(body);
    this.serviceProduct.CreateProduct(body).subscribe((data: any) => {
      Swal.fire({
        title: 'Se a creado exitosamente el producto',
        icon: 'success',
      }).then((result) => {
        // Verifica si el usuario hizo clic en el botón "OK"
        if (result.isConfirmed) {
          // Recargar la página
          window.location.reload();
        }
      });
    });
  }

  public formProduct = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.minLength(1),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(5),
    ]),
    categoria: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    images: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  public GetCategory(){ 
    this.serviceCategory.ObtenerCategorias().subscribe((data: any) => {
      this.data = Array.from(data)
    })
  }

  public obtenerCategoria(categoria: string){
    this.categoria = categoria;
    this.formProduct.patchValue({
      categoria: this.categoria
    });
    
  }

}
