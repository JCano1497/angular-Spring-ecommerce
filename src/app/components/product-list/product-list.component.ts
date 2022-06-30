import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchMode: boolean =false;
  products: Product[] =[];
  currentCategoryId:number = 1;
  currentCategoryName: string = "";
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;
  previousCategoryId: number = 1;

  //pass current activated route
  constructor(private productservice:ProductService,
              private cartservice: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.listProducts();
    })
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }
  handleSearchProducts() {
    const theKeyword= this.route.snapshot.paramMap.get('keyword') || '';
    this.productservice.searchProducts(theKeyword).subscribe(
      data =>{
        this.products=data;
      }
    )
  }
  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      // plus sign converts to number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else{
      this.currentCategoryId = 1;
      this.currentCategoryName = "Books"
    }
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
    this.productservice.getProductListPaginate(this.thePageNumber -1, this.thePageSize,
      this.currentCategoryId).subscribe(this.processResult());
  }
  processResult(){
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) =>{ this.products= data._embedded.products;
      this.thePageNumber = data.page.number +1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }
  addToCart(theProduct: Product){
    console.log(theProduct.name);
    const theCartItem = new CartItem(theProduct);
    this.cartservice.addToCart(theCartItem);
  }

}
