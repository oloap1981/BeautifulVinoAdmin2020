import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bvdatepicker',
  templateUrl: './bvdatepicker.component.html',
  styleUrls: ['./bvdatepicker.component.scss']
})
export class BvdatepickerComponent implements OnInit {

  @Input() inputDate: number;
  @Output() sendDate: EventEmitter<number> = new EventEmitter<number>();

  public dateInt = new Date();

  public formatter = (date: Date) => {
    return `${this.getFormattedDay(date)}/${this.getFormattedMonth(date)}/${date.getFullYear()}`;
  }

  constructor() { }

  ngOnInit() {
    if (this.inputDate > 0) {
      this.dateInt = new Date(this.inputDate);
    } else {
      this.dateInt = new Date(Date.now());
    }
    // this.dateInt.setDate(this.dateInt.getDate());
  }

  private getFormattedMonth(date: Date): string {
    const month = date.getMonth() + 1;
    return (month < 10 ? '0' + month : month + '');
  }

  private getFormattedDay(date: Date): string {
    const day = date.getDate();
    return (day < 10 ? '0' + day : day + '');
  }

  public close(event) {
    this.sendDate.emit(this.dateInt.getTime());
  }

}
