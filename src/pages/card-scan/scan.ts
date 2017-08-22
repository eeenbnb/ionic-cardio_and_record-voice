import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';

import { CardIO } from '@ionic-native/card-io';

@Component({
  selector: 'page-about',
  templateUrl: 'scan.html'
})
export class ScanPage {

  constructor(
    public navCtrl: NavController,
    private cardIO:CardIO,
    public alertCtrl: AlertController
  ) {}

  scan(){
    this.cardIO.canScan().then(
      (res: boolean) => {
        if(res){
          let options = {
            requireExpiry: true,
            requireCCV: false,
            requirePostalCode: false
          };
          this.cardIO.scan(options).then((res:any)=>{
            this.showAlert(res['cardNumber']);
          });
        }
      }
    );
  }

  showAlert(text:string) {
    let alert = this.alertCtrl.create({
      title: 'alert',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
