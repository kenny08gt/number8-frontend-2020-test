import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { findIndex, range, sortBy } from 'lodash-es';
import * as _lodash from 'lodash-es';

const moment = _rollupMoment || _moment;
declare var $: any; declare var jQuery: any;

export interface CalendarDate {
  mDate: _moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input() info: any;

  constructor() {}

  currentDate = moment();
  dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  startDate: Date;
  endDate: Date;
  api: any[];

  @Input() selectedDates: CalendarDate[] = [];

  isToday(date: _moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: _moment.Moment): boolean {
    return _lodash.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedMonth(date: _moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
  } 

  updateCalendarAfterChange(new_date): void {
     this.currentDate = moment(new_date);
    //this.generateCalendar();
  }

  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentMoment: _moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _lodash.range(start, start + 42)
            .map((date: number): CalendarDate => {
              const d = moment(firstDayOfGrid).date(date);
              return {
                today: this.isToday(d),
                selected: this.isSelected(d),
                mDate: d,
              };
            });
  } 

  checkDayType(day) {
    const dayNumber = day.mDate.weekday();
    if (dayNumber === 0 || dayNumber === 6) {
      return true;
    }
  }

  insideRange(day) {
    if (day.mDate.valueOf() >= this.startDate.getTime() &&
        day.mDate.valueOf() < this.endDate.getTime()) {
      return true;
    }
  }

  isHoliday(day) {
    return this.api.find(function(day_holiday) {
      // console.log(moment(day_holiday.date));
      // console.log(day);   
      // return true;
      if(moment(day_holiday.date).valueOf() == day.mDate.valueOf()) {
        return true;
      }
    });
    return false;
  }

  ngOnInit() {
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.info &&
        changes.info.currentValue) {

        let {date, days, country, api} = changes.info.currentValue;

        this.startDate = date;
        //1. obtener los meses de diferencia de la fecha seleccionada date, con el currentDate

        this.endDate = new Date(moment(date).add(days, 'day').format("YYYY-MM-DD"));

        this.updateCalendarAfterChange(date);

        this.api = api.holidays;
        console.log(this.api);
    }
  }
}