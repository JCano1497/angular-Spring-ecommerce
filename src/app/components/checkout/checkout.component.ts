import { CartService } from 'src/app/services/cart.service';
import { State } from './../../common/state';
import { Country } from './../../common/country';
import { ShopFormService } from './../../services/shop-form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Purchase } from './../../common/purchase';
import { Router } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number=0;
  totalQuantity: number=0;
  creditCardYears: number[] =[];
  creditCardMonths: number[] =[];
  countries: Country[] = [];
  states: State[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
    private shopFormService: ShopFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) {
    this.checkoutFormGroup =this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode: ['']


      }),
      billingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode: ['']

      }),
      creditCard: this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth: [''],
        expirationYear: ['']

      }),

    })
   }

  ngOnInit(): void {
    this.shopFormService.getCreditCardMonth(new Date().getMonth()).subscribe(
      data =>{
        this.creditCardMonths =data;
      }
    )
    this.shopFormService.getCreditCardYear().subscribe(
      data =>{
        this.creditCardYears = data;
      }
    )
    this.shopFormService.getCountries().subscribe(
      data =>{
        console.log(JSON.stringify(data));
        this.countries = data;
      }
    )
    this.reviewCartDetail();
  }
  reviewCartDetail(){
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    )
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    )
  }
  onSubmit(){
    console.log(this.checkoutFormGroup.get('customer')?.value);
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    const cartItems = this.cartService.cartItems;
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));
    let purchase = new Purchase();

    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const bliingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = bliingState.name;
    purchase.billingAddress.country = billingCountry.name;

    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    purchase.order = order;
    purchase.orderItems = orderItems;
    console.log(purchase);
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          alert(`Your order has been recieved. \n Order Tracking Number: ${response.orderTrackingNumber}`)
          this.resetCart();
        },
        error: err =>{
          alert(`There was an error processing your order ${err.message}`);
        }
      }
    )

  }
  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl("/products")
  }
  copyShippingtoBilling(event:any){
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates =this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }

  }
  handleMonthsAndYears(){
    const creditform= this.checkoutFormGroup.get('creditCard');
    const selectedYear: number = Number(creditform?.value.expirationYear);
    const current: number = new Date().getFullYear();
    let month: number = 0;
    console.log(current);
    if(current === selectedYear){

      month= new Date().getMonth()+1;
    }
    else{
      month = 1;
    }
    this.shopFormService.getCreditCardMonth(month).subscribe(
      data =>{
        console.log(JSON.stringify(data));
        this.creditCardMonths =data;
      }
    )
  }
  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    console.log(countryCode);
    console.log(formGroupName);
    this.shopFormService.getStates(countryCode).subscribe(
      data =>{
        if(formGroupName == "shippingAddress"){
          this.shippingAddressStates = data;
        }
        else{
          this.billingAddressStates = data;
        }
        //set the first value in form
        formGroup?.get('state')?.setValue(data[0]);
      }
    )
  }

}
