import { State } from './../../common/state';
import { Country } from './../../common/country';
import { ShopFormService } from './../../services/shop-form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
              private shopFormService: ShopFormService) {
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
  }
  onSubmit(){
    console.log("handelingData");
    console.log(this.checkoutFormGroup.get('customer')?.value);
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
