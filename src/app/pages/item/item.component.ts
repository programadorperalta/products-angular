import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductDescription } from '../../interfaces/product-description-interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductDescription = {};
  productoID!: string;
  
  constructor(private route:ActivatedRoute,
              public productService: ProductosService ) { }

  ngOnInit(): void {

    this.route.params
    .subscribe(parametros => {
      //console.log(parametros['id']); //mostrar el id del producto. 
      this.productService.getProduct(parametros['id'])
      .subscribe((product:ProductDescription) => {
        this.productoID=parametros['id'];
        this.producto = product;
        console.log(product);
      });

    })

  }

}
