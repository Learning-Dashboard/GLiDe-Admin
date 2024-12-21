import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor() { }

  formatDate(date: Date): String {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    return date.toJSON().substring(0,10);
  }
}
