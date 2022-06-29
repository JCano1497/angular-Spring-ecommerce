import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productservice:ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
    this.handleProductDetails();
  })
  }
  handleProductDetails() {
    const theId: any = this.route.snapshot.paramMap.get('id') || '0';
    const theProductId =parseInt(theId);
    this.productservice.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

}
