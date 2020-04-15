import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-bvtimepicker',
  templateUrl: './bvtimepicker.component.html',
  styleUrls: ['./bvtimepicker.component.scss']
})
export class BvtimepickerComponent implements OnInit {

  @Input() inputDate: number;
  @Output() sendTime: EventEmitter<number> = new EventEmitter<number>();

  public dateInt = new Date(Date.now());

  public formatter = (date: Date) => {
    return `${this.getFormattedHour(date)}:${this.getFormattedMinutes(date)}`;
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

  private getFormattedHour(date: Date): string {
    const hours = date.getHours();
    return (hours < 10 ? '0' + hours : hours + '');
  }

  private getFormattedMinutes(date: Date): string {
    const minutes = date.getMinutes();
    return (minutes < 10 ? '0' + minutes : minutes + '');
  }

  public close(event) {
    this.sendTime.emit(this.dateInt.getTime());
  }

}
