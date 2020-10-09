import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.scss']
})
export class CambioPasswordComponent implements OnInit {

  public password: string;
  public passwordrepeat: string;

  public stato = 'in attesa di invio';

  constructor() { }

  ngOnInit() {
  }

  public invia(): void {

  }

}
