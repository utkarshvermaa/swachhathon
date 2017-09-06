import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/*
  Generated class for the ComplaintsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'complaints.html'
})
export class Complaints {

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('Hello Complaints Page');
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Complaint',
      subTitle: 'Success ',
      buttons: ['Ok']
    });
    alert.present();
  } 

}
