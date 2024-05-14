import { Component } from '@angular/core';
// Importamos el servicio
import { FakeIpService } from 'src/app/Service/ServiceProduct/fake-ip.service';
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
  public ControlPaginatorAvanzar: boolean = true;
  public ControlPaginatorRetroceder: boolean = true;

  public odtenerProductos() {
    // Estos dos atributos son los que se envian al servicio para paginar los productos
    this.service
      .odtenerProductos()
      .subscribe((data: any) => {
        this.data = Array.from(data);
        console.log(this.data);
        
        if (this.imagesControlFirts == 0 && this.imagesControlEnd == 0 && data.length > 3) {
          this.ControlPaginatorAvanzar = false;
          this.imagesControlFirts = data.length - 3;
          this.imagesControlEnd = data.length;
          
        }
        else if(data.length <=3){
          this.imagesControlFirts = 0;
          this.imagesControlEnd = data.length;
        }
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
   
    
    if (this.imagesControlFirts - 3 < 0 || this.imagesControlFirts - 3  == 0) {

      this.imagesControlEnd = this.imagesControlFirts;
      this.imagesControlFirts = 0;
  
      this.ControlPaginatorAvanzar = true;
      this.odtenerProductos();

    } else {
      this.odtenerProductos();
      this.imagesControlEnd = this.imagesControlFirts;
      this.imagesControlFirts -= 3;
    }
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
        Id_productos: producto.Id_productos,
        title: producto.title,
        price: producto.price,
        description: producto.description,
        categoria: producto.categoria,
        images: producto.images,
      };
    }, 50);
  }

  public scrollTo(elementId: string): void {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }

}

