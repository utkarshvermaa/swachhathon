import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Profile } from '../profile/profile';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AdminPagePage Page');
  }

}
