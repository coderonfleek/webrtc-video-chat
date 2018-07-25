import { Component, ViewChild, ElementRef } from "@angular/core";

import SimpleWebRTC from "simplewebrtc";
import {
  NavController,
  AlertController,
  ToastController,
  ActionSheetController
} from "ionic-angular";

//This is to allow the linter ignore the global webtrc variable warning
//declare var SimpleWebRTC: any;

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("local") localVideo: ElementRef;
  @ViewChild("remote") remoteVideo: ElementRef;

  webRTC: any;
  userPic: string;
  audioState: string;
  videoState: string;
  inCall: boolean;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionCtrl: ActionSheetController
  ) {}

  ionViewDidEnter() {
    //this.userPic = sessionStorage.getItem("userPic");
    this.audioState = "unmuted";
    this.videoState = "playing";
    this.inCall = false;

    this.webRTC = new SimpleWebRTC({
      localVideoEl: this.localVideo.nativeElement,
      remoteVideosEl: this.remoteVideo.nativeElement,
      autoRequestMedia: true
    });

    //this.webRTC.joinRoom(sessionStorage.getItem("userEmail"));
    this.webRTC.joinRoom("fik4christ");

    // connection status
    this.webRTC.on("videoAdded", (video, peer) => {
      if (peer && peer.pc) {
        peer.pc.on("iceConnectionStateChange", event => {
          switch (peer.pc.iceConnectionState) {
            case "checking":
              let toast = this.toastCtrl.create({
                message: "Connecting...",
                duration: 2000
              });
              toast.present();
              break;
            case "connected":
            case "completed":
              navigator.vibrate(500);
              let connectedToast = this.toastCtrl.create({
                message: "Connected!",
                duration: 2000
              });
              connectedToast.present();
              this.inCall = true;

              this.localVideo.nativeElement.setAttribute("width", "400");
              break;
            case "disconnected":
              navigator.vibrate(500);
              let disconnectedToast = this.toastCtrl.create({
                message: "Disconnected",
                duration: 2000
              });
              disconnectedToast.present();
              this.inCall = false;
              break;
            case "failed":
              let failedToast = this.toastCtrl.create({
                message: "Connection failed",
                duration: 2000
              });
              failedToast.present();
              break;
            case "closed":
              let closedToast = this.toastCtrl.create({
                message: "Connection closed",
                duration: 2000
              });
              closedToast.present();
              this.inCall = false;
              break;
          }
        });
      }
    });

    /* this.webRTC.on("mute", () => {
      navigator.vibrate(500);
      let toast = this.toastCtrl.create({
        message: "The other user has paused their video",
        duration: 2000
      });
      toast.present();
    }); */
  }
}
