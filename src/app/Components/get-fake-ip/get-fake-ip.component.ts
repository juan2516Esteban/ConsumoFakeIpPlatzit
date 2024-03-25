import { Component } from '@angular/core';
// Importamos el servicio
import { FakeIpService } from 'src/app/Service/fake-ip.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-get-fake-ip',
  templateUrl: './get-fake-ip.component.html',
  styleUrls: ['./get-fake-ip.component.css'],
})
export class GetFakeIpComponent {
  /*instaciamos una variable en el constructor para llamar a nuestro servicio 
  FakeIpService*/
  constructor(private service: FakeIpService) {}

  ngOnInit(): void {
    this.odtenerProductos();

    interval(5000).subscribe(() => {
      this.cambiarVariable();
    });
  }

  public data: any[] = [];
  public body: any = null;
  public indice: number = 0;
  public imagesControlFirts: number = 0;
  public imagesControlEnd: number = 0;
  public ControlPaginatorAvanzar: boolean = false;
  public ControlPaginatorRetroceder: boolean = true;

  public odtenerProductos() {
    this.service
      // Estos dos atributos son los que se envian al servicio para paginar los productos
      .odtenerProductos()
      .subscribe((data: any) => {
        this.data = Array.from(data);

        if (this.imagesControlFirts == 0 && this.imagesControlEnd == 0) {
          this.imagesControlFirts = data.length - 3;
          this.imagesControlEnd = data.length;
        }

        this.data.map((item: any) => {
          let imageStringify = JSON.stringify(item.images); // convertimos el array de imagenes a string
          let imageNoGarbage = imageStringify
            .substring(2, imageStringify.length - 2)
            .replaceAll('\\', ' ')
            .replaceAll('""', '"')
            .replaceAll('" "', '"')
            .replaceAll(' ', '');
          try {
            item.images = JSON.parse(imageNoGarbage);
            item.imagesActual = item.images[0];
          } catch (e) {}
        });
      });
  }

  cambiarVariable() {
    this.indice++;
    this.data.map((item: any) => {
      let longitud: number = item.images.length;
      item.imagesActual = item.images[this.indice % longitud];
    });
  }

  public PaginatorAvanzar() {
    this.ControlPaginatorRetroceder = false;
    this.imagesControlEnd = this.imagesControlFirts;
    this.imagesControlFirts -= 3;
    if (this.imagesControlFirts - 3 < 0 || this.imagesControlFirts - 3 == 0) {
      this.imagesControlEnd = this.imagesControlFirts;
      this.imagesControlFirts = 0;
      this.odtenerProductos();
      this.ControlPaginatorAvanzar = true;
    } else {
      this.odtenerProductos();
    }
  }

  public scrollTo(elementId: string): void {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }

  public PaginatorRetroceder() {
    this.ControlPaginatorAvanzar = false;
    this.imagesControlFirts = this.imagesControlEnd;
    this.imagesControlEnd += 3;
    if (this.imagesControlEnd + 3 > this.data.length) {
      this.imagesControlEnd = this.data.length;
      this.odtenerProductos();
      this.ControlPaginatorRetroceder = true;
    } else {
      this.odtenerProductos();
    }
  }

  fillbody(producto: any) {
    this.body = null;
    setTimeout(() => {
      this.body = {
        id: producto.id,
        title: producto.title,
        price: producto.price,
        description: producto.description,
        categoryId: producto.category.id,
        images: producto.images[0],
      };
    }, 50);
  }
}
