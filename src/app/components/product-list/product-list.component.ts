import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchMode: boolean;
  products: Product[];
  currentCateogryId:number;
  currentCategoryName: string;

  //pass current activated route
  constructor(private productservice:ProductService,
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
      this.currentCateogryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else{
      this.currentCateogryId = 1;
      this.currentCategoryName = "Books"
    }
    this.productservice.getProductList(this.currentCateogryId).subscribe(
      data =>{
        this.products =data;
      }
    )
  }

}
