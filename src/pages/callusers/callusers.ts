import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { AngularFirestore } from "angularfire2/firestore";
import { Storage } from "@ionic/storage";
import { appconfig } from "../../app/app.config";
import { User } from "../../app/app.models";
import { Observable } from "rxjs/Observable";

import { map } from "rxjs/operators";
import { ChatService } from "../../app/app.service";
import { CallPage } from "../call/call";

/**
 * Generated class for the CallusersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-callusers",
  templateUrl: "callusers.html"
})
export class CallusersPage implements OnInit {
  availableusers: any = [];
  chatuser;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private storage: Storage,
    private chatService: ChatService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChatsPage");
  }

  ngOnInit() {
    //Fetch other users
    //let loggedInUser = this.storage.get("chatuser");

    this.storage.get("chatuser").then(chatuser => {
      this.chatuser = chatuser;

      this.db
        .collection<User>(appconfig.users_endpoint)
        .valueChanges()
        .subscribe(users => {
          //this.availableusers = users;
          console.log(users);
          this.availableusers = users.filter(user => {
            if (user.phone != chatuser.phone) {
              return user;
            }
          });
        });
    });
  }

  goToChat(chatpartner) {
    this.chatService.currentChatPairId = this.chatService.createPairId(
      this.chatuser,
      chatpartner
    );

    this.chatService.currentChatPartner = chatpartner;

    this.navCtrl.push(CallPage);
  } //goToChat
}
