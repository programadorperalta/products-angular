import { Product } from './../interfaces/product.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  loading = true;
  products: any[] = []

  constructor(private http:HttpClient) {
    this.loadProducts();
  }

  private loadProducts(){
    this.http.get('https://angular-html-9baaa-default-rtdb.firebaseio.com/productos_idx.json').subscribe((resp:any)=>{

    this.products = resp;
    //this.loading = false;
    
    setTimeout(()=>{
      this.loading= false;
    },2000);


    })
  }
}
