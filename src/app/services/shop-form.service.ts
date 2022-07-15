import { State } from './../common/state';
import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Country } from '../common/country';
@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesUrl='http://localhost:8090/api/countries';
  private statesUrl='http://localhost:8090/api/states';
  constructor(private httpClient: HttpClient) { }
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
  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {

    // search url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

}
interface GetResponseCountries{
  _embedded:{
  countries: Country[];
  }
}
interface GetResponseStates{
  _embedded:{
  states: State[];
  }
}
