import { Component } from '@angular/core';
import { NavController,AlertController,ViewController } from 'ionic-angular';

import { File,FileEntry } from '@ionic-native/file';
import { Media } from '@ionic-native/media';

@Component({
  selector: 'page-contact',
  templateUrl: 'rec-modal.html'
})
export class RecModalPage {
  files:FileEntry[];
  constructor(
    public navCtrl: NavController,
    private file: File,
    private media: Media,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController
    ) {}

  showAlert(text:string) {
    let alert = this.alertCtrl.create({
      title: 'alert',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  ngOnInit() {
      this.file.listDir(this.file.dataDirectory,"rec/").then(
        (files:any)=>{
          this.files = files;
        }
      ).catch(
        (err:any)=>{
          this.showAlert(err.message);
          console.log(err);
        }
      );
   }

  play(file:FileEntry){
    const mediaFile = this.media.create(file.toURL());
    mediaFile.play();
    this.showAlert(file.toURL())
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
