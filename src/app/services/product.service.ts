import { response } from 'express';
import { ProductCategory } from './../common/product-category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl='http://localhost:8090/api/products';
  private categoryUrl='http://localhost:8090/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId:number): Observable<Product[]>{

    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.GetProducts(searchUrl);

}
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }
  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.GetProducts(searchUrl);

  }



  private GetProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  getProduct(theProductId: number) : Observable<Product> {
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);

  }
}

interface GetResponseProducts{
  _embedded:{
    products: Product[];
  }
}
interface GetResponseProductCategories{
  _embedded:{
    productCategory: ProductCategory[];
  }

}
