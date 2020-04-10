import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HolidayApiService } from './holiday-api.service';

declare var $: any; declare var jQuery: any;

interface SelectedInfo {
    date: Date,
    days: number,
    country: string,
    api: any
};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  info: SelectedInfo = {
    date: new Date(),
    days: 20,
    country: 'US',
    api: null
  };

  loading: boolean = false;
  loaded: boolean = false;
  countries: any[] = [
    { value: 'US', viewValue: 'US' }
  ];

  selectedInfoDate$: BehaviorSubject<SelectedInfo> =
    new BehaviorSubject<SelectedInfo>(null);

  constructor(private api: HolidayApiService) {}

  ngOnInit() {
    
  }

  submit() {
    this.loaded = false;
    this.loading = true;
    this.api.getHolidays(this.info).subscribe(data => {
        this.info.api = data;
        this.loaded = true;
        this.loading = false;
        this.selectedInfoDate$.next(this.info);
      }, error => {
        console.log('Error', error);
      });
  }

  reset() {
    this.loaded = false;
  }
}
