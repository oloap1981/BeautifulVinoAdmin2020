// import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AlertService {

  constructor(
    public router: Router,
    public toastrService: ToastrService) {
  }

  public async presentAlert(alertMessage: string) {
    this.toastrService.success(alertMessage);
  }

  public async presentErrorAlert(alertMessage: string) {
    this.toastrService.error(alertMessage);
  }
}

