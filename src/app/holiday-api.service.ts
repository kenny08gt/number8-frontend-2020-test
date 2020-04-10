import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HolidayApiService {

  constructor(private http: HttpClient) { }

  private _apiURL = 'https://holidayapi.com/v1/holidays?key=3fdab657-7bfa-4a9a-8cfa-8fca30001f41';

  getHolidays(info) {
    const year = new Date().getFullYear() - 1;
    const params = new HttpParams()
      .set('country', info.country)
      .set('month', "0")
      .set('day', "0")
      .set('year', year.toString());
    return this.http.get(this._apiURL, { responseType: 'json', params });
  }

}