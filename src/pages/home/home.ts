import { Component, OnInit } from "@angular/core";
import {
  NavController,
  LoadingController,
  ToastController
} from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { User } from "../../app/app.models";
import { Observable } from "rxjs";
import { ChatService } from "../../app/app.service";
import { Storage } from "@ionic/storage";
import { appconfig } from "../../app/app.config";
import { CallPage } from "../call/call";
import { CalloptionsPage } from "../calloptions/calloptions";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  //email: string;
  loginForm: any = {};
  constructor(
    public navCtrl: NavController,
    private db: AngularFirestore,
    private chatservice: ChatService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get("chatuser").then(chatuser => {
      if (chatuser && chatuser.phone !== "") {
        this.navCtrl.push(CalloptionsPage);
      }
    });
  }

  loginUser() {
    if (this.loginForm.phone != "") {
      //Check if email already exists
      let myLoader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      myLoader.present().then(() => {
        this.db
          .collection<User>(appconfig.users_endpoint, ref => {
            return ref.where("phone", "==", this.loginForm.phone);
          })
          .valueChanges()
          .subscribe(users => {
            console.log(users);

            if (users.length === 0) {
              //Register User

              //Add the timestamp
              this.loginForm.time = new Date().getTime();

              this.chatservice
                .addUser(this.loginForm)
                .then(res => {
                  //Registration successful, go to chats page
                  this.storage.set("chatuser", this.loginForm);
                  myLoader.dismiss();

                  let toast = this.toastCtrl.create({
                    message: "Login In Successful",
                    duration: 3000,
                    position: "top"
                  });
                  toast.present();

                  this.navCtrl.push(CalloptionsPage);
                })
                .catch(err => {
                  console.log(err);
                  myLoader.dismiss();
                });
            } else {
              //User already exists, move to chats page
              this.storage.set("chatuser", users[0]);

              let toast = this.toastCtrl.create({
                message: "Login In Successful",
                duration: 3000,
                position: "top"
              });
              toast.present();
              myLoader.dismiss();

              this.navCtrl.push(CalloptionsPage);
            }
          });
      });
    } else {
      let toast = this.toastCtrl.create({
        message: "Enter Phone Number to log in",
        duration: 3000,
        position: "top"
      });
      toast.present();
    }
  }
}
