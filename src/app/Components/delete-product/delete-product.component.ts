import { Component, Input } from '@angular/core';
import { FakeIpService } from 'src/app/Service/fake-ip.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent {
  constructor(private service: FakeIpService) {}

  @Input() idProduct: any;

  ngOnInit(): void {}

  public deleteProduct(id: any) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminado exitosamente!',
          text: 'Tu producto ha sido eliminado.',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.DeleteProduct(id).subscribe((data: any) => {
              window.location.reload();
            });
          }
        });
      }
    });
  }
}
