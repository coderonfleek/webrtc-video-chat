import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { CallPage } from "../pages/call/call";
import { appconfig } from "./app.config";
import { ChatService } from "./app.service";
import { IonicStorageModule } from "../../node_modules/@ionic/storage";

@NgModule({
  declarations: [MyApp, HomePage, ListPage, CallPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(appconfig.firebase),
    AngularFirestoreModule,
    IonicStorageModule.forRoot({
      name: "__ionvideochat"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, ListPage, CallPage],
  providers: [
    StatusBar,
    SplashScreen,
    ChatService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
