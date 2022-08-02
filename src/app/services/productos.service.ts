import { Product } from './../interfaces/product.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  loading = true;
  products: any[] = []
  productsFilteredOut: Product[] = []

  constructor(private http:HttpClient) {
    this.loadProducts();
  }

  private loadProducts(){

    return new Promise((resolve,reject)=>{
      this.http.get('https://angular-html-9baaa-default-rtdb.firebaseio.com/productos_idx.json').subscribe((resp:any)=>{
        this.products = resp;
        this.loading = false;
        // setTimeout(()=>{
        //   this.loading= false;
        // },2000);
        })
    });
  }

  getProduct(id:string){
    return this.http.get(`https://angular-html-9baaa-default-rtdb.firebaseio.com/productos/${id}.json`)
  }

  findProduct(term:string){
    if(this.products.length===0){
      //cargarProductos
      this.loadProducts().then(()=>{
        //ejecutar despues de obtener los productos 
        //APLICAR FILTRO
        this.filterProduct(term);
      })
    }else{
      //aplicar el filtro
      this.filterProduct(term);
    }

    
  }


  private filterProduct(term:string){
    // this.productsFilteredOut = this.products.filter(product => {
    //   return true;
    // })
    // console.log(this.productsFilteredOut);
    //console.log(this.products);
    this.productsFilteredOut = [];

    term = term.toLocaleLowerCase();

    this.products.forEach(prod=>{

      const titleLower = prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf(term)>=0 || titleLower.indexOf(term)>=0){
        this.productsFilteredOut.push(prod);
      }
    })
    
  }
}
