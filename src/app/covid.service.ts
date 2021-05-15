import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http:HttpClient) { }

  public covid19Reports(){
   return this.http.get("https://disease.sh/v3/covid-19/countries");
  }
}
