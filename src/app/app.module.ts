import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { CalendarModule } from 'angular-calendar';

import {
  MatFormFieldModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HolidayApiService } from './holiday-api.service';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    AppComponent,
    CalendarComponent
  ],
  providers: [HolidayApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
