import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Profile } from '../profile/profile';
import { AlertController } from 'ionic-angular';



/*
  Generated class for the AdminPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPagePage {

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('Hello AdminPagePage Page');
  }

//   launch(url) {
//     this.platform.ready().then(() => {
//         cordova.InAppBrowser.open(url, "_system", "location=true");
//     });
// }

presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Lottery User Generated',
    subTitle: 'Success! UserId:25234 has been selected as the winner for this month ',
    buttons: ['Ok']
  });
  alert.present();
} 

presentAlert1() {
  let alert = this.alertCtrl.create({
    title: 'Report Generated',
    subTitle: 'Check at https://goo.gl/jwkkSc  ',
    buttons: ['Ok']
  });
  alert.present();
} 

}
