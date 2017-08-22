import { Component } from '@angular/core';
import { NavController,AlertController,ModalController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { RecModalPage } from './rec-modal/rec-modal'

import { Media, MediaObject } from '@ionic-native/media';
import { File,FileEntry } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-contact',
  templateUrl: 'rec.html'
})
export class RecPage {
  status:string = "stop";
  amp:any = "0";
  ampEvent:any;
  date:any;
  recFile:MediaObject;


  constructor(
    public navCtrl: NavController,
    public platform:Platform,
    private media: Media,
    private file: File,
    private androidPermissions: AndroidPermissions,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
    ) {
      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.RECORD_AUDIO,
        this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS
      ]);

      if(this.platform.is("ios")){
        this.showAlert("your device is iphone");
      }else if(this.platform.is("android")){
        this.file.createDir(this.file.dataDirectory, 'rec/', true).then().catch((err)=>this.showAlert(err.message));
      }

    }

  startRec(){
    if(this.status === "stop"){

      this.date = Date.now();
      if(this.platform.is("android")){
        this.recFile = this.media.create(`rec_${this.date}.amr`);
      }
      this.recFile.onSuccess.subscribe(() =>{
        console.log('Action is successful');
      });
      this.recFile.onError.subscribe(error => console.log('Error!', error));

      this.recFile.startRecord();
      this.ampEvent = setInterval(() =>{
        this.recFile.getCurrentAmplitude().then((res)=>{
          this.amp = res;
        });
      }, 100);

      this.status = "recording";

    }else{
      clearInterval(this.ampEvent);
      this.recFile.stopRecord();
      this.recFile.release();
      this.status = "stop";

      this.file.copyFile(this.file.externalRootDirectory,`rec_${this.date}.amr`,this.file.dataDirectory+"rec/",`rec_${this.date}.amr`).then((f:FileEntry)=>{
        this.file.removeFile(this.file.externalRootDirectory,`rec_${this.date}.amr`);
        this.showAlert(f.toURL());
      });


    }
  }

  openModal(){
    let modal = this.modalCtrl.create(RecModalPage);
    modal.present();
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
