import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'BVDateFormat_gg_mm_aaaa_hh_mm' })
export class BVDateTimePipe implements PipeTransform {
  transform(value: string, times: number) {
    // in input ho sempre una stringa contenente il long della data
    const date = new Date(+value);
    return this.leftpad(date.getDate(), 2)
      + '/' + this.leftpad(date.getMonth() + 1, 2)
      + '/' + date.getFullYear()
      + ' ' + this.leftpad(date.getHours())
      + ':' + this.leftpad(date.getMinutes());
  }

  private leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }
}
