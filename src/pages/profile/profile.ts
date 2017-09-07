import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { AdminPagePage } from '../admin/admin';
import { AlertController } from 'ionic-angular';

import md5 from 'crypto-md5';
 
@Component({
  selector: 'page-home',
  templateUrl: 'profile.html'
})
export class Profile {
 
    email: any;
    password: any;
    profilePicture: any = "https://www.gravatar.com/avatar/"
 
    constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
 
    }

    ionViewDidLoad() {
        console.log('Hello profile Page');
        this.presentAlert();
      }
 
    emailChanged(){
        this.profilePicture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex');
    }

    presentAlert() {
        let alert = this.alertCtrl.create({
          title: 'Do you Know ',
          subTitle: 'Itne log mar gaye  ',
          buttons: ['Ok']
        });
        alert.present();
      } 
    

    goToMapPage(){
        this.navCtrl.push(MapPage);
    }
    goToAdminPage(){
        this.navCtrl.push(AdminPagePage);
    }
 
}