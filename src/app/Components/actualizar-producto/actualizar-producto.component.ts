import { Component, Input } from '@angular/core';
import { FakeIpService } from 'src/app/Service/fake-ip.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetFakeIpComponent } from '../get-fake-ip/get-fake-ip.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css'],
})
export class ActualizarProductoComponent {
  constructor(
    private service: FakeIpService,
    private get: GetFakeIpComponent
  ) {}

  ngOnInit(): void {
    this.Rellenar();
  }

  @Input() body: any = null;

  public Cancelar() {
    console.log('cancelar');
    this.get.body = null;
    this.get.scrollTo('fistView');
  }

  public UpdateProduct(id: any) {
    Swal.fire({
      title: '¿Quieres actualizar el producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Actualizar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'Tu producto ha sido actualizado correctamente.',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            let body = {
              title: this.UpdateProductForms.get('title')?.value,
              price: this.UpdateProductForms.get('price')?.value,
              description: this.UpdateProductForms.get('description')?.value,
              categoryId: this.UpdateProductForms.get('categoryId')?.value,
              images: [this.UpdateProductForms.get('images')?.value],
            };
            this.service.UpdateProduct(body, id).subscribe((data: any) => {
              window.location.reload();
            });
          }
        });
      }
    });
  }

  public UpdateProductForms = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.minLength(1),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
      Validators.minLength(5),
    ]),
    categoryId: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    images: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  public Rellenar() {
    if (this.body != null) {
      this.UpdateProductForms.setValue({
        title: this.body.title,
        price: this.body.price,
        description: this.body.description,
        categoryId: this.body.categoryId,
        images: this.body.images,
      });
    }
  }
}
