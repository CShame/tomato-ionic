import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { Insomnia } from '@ionic-native/insomnia';
import { Network } from '@ionic-native/network';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AppCenterCrashes } from '@ionic-native/app-center-crashes';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { JPush } from '@jiguang-ionic/jpush';

import { RebirthStorageModule } from 'rebirth-storage';
import { RebirthHttpModule } from 'rebirth-http';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

// see:https://www.npmjs.com/package/ng-socket-io
import { SocketIoModule } from 'ng-socket-io';
import { MyAppComponent } from './app.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EFOSHttpInterceptor } from './providers/http.interceptor.service';

@NgModule({
  declarations: [MyAppComponent],
  imports: [
    RebirthStorageModule,
    RebirthHttpModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    IonicModule.forRoot(MyAppComponent, {
      platforms: {
        android: {
          backButtonText: '',
          tabsHideOnSubPages: true,
          iconMode: 'md',
          tabsLayout: 'icon-top',
        },
        ios: {
          backButtonText: '返回',
          tabsHideOnSubPages: true,
          iconMode: 'ios',
          swipeBackEnabled: false, // 禁用 IOS 手势滑动返回
          tabsLayout: 'icon-top',
        },
      },
    }),
    SocketIoModule,
    IonicStorageModule.forRoot({
      name: '__tomatobangdb',
      driverOrder: ['indexeddb', 'sqlite', 'websql'],
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyAppComponent],
  providers: [
    StatusBar,
    BackgroundMode,
    SplashScreen,
    File,
    FileTransfer,
    FileOpener,
    Insomnia,
    Network,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler,
    },
    JPush,
    AppCenterCrashes,
    AppCenterAnalytics,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EFOSHttpInterceptor,
      multi: true
    }
    // { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
})
export class AppModule { }
