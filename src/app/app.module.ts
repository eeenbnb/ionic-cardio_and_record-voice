import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//pages
import { ScanPage } from '../pages/card-scan/scan';
import { RecPage } from '../pages/rec/rec';
import { RecModalPage } from '../pages/rec/rec-modal/rec-modal';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

//ionic native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CardIO } from '@ionic-native/card-io';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';


@NgModule({
  declarations: [
    MyApp,
    ScanPage,
    RecPage,
    RecModalPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ScanPage,
    RecPage,
    RecModalPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CardIO,
    Media,
    File,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
