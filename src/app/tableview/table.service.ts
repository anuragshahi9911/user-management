import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';



@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private httpClient: HttpClient) { }

  public getTableData() {
    return this.httpClient.get('https://api.myjson.com/bins/pkisp');
  }
}
