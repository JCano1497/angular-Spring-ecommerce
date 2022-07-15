import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  constructor() { }
  getCreditCardMonth(startMonth: number): Observable<number[]>{
    let data: number[] =[];
    for ( let theMonth= startMonth; theMonth<=12; theMonth++){
      data.push(theMonth)
    }
    return of(data);
  }
  getCreditCardYear(): Observable<number[]>{
    let data: number[] =[];
    const startYear: number = new Date().getFullYear();
    for (let theYear=startYear; theYear<=startYear+10; theYear++){
      data.push(theYear)
    }
    return of(data);
  }
}
