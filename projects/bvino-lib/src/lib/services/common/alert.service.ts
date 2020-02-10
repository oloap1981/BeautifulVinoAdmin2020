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

  // public async presentAlertLogout() {
  //   const alert = this.alertController.create({
  //     header: 'Logout',
  //     message: 'Sicuro di voler uscire?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Si',
  //         handler: () => {
  //           this.sessionService.clearUserData();
  //           this.router.navigate(['login']);
  //         }
  //       }
  //     ]
  //   });
  //   alert.then((_alert: any) => {
  //     _alert.present();
  //   });
}

