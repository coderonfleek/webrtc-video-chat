import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CallusersPage } from "../callusers/callusers";

/**
 * Generated class for the CalloptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-calloptions",
  templateUrl: "calloptions.html"
})
export class CalloptionsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad CalloptionsPage");
  }

  goToCallUsersPage() {
    this.navCtrl.push(CallusersPage);
  } //goToCallUsersPage

  goToConferenceCallsPage() {} //goToConferenceCallsPage
}
