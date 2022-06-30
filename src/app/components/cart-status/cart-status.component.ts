import { CartService } from './../../services/cart.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number= 0;
  totalQuantity: number = 0;
  constructor(private cartService: CartService) {
  }
  updateCartService() {
    //subscribe to cart
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
  }

  ngOnInit(): void {
    this.updateCartService();
    console.log(this.cartService.cartItems);
  }

}
