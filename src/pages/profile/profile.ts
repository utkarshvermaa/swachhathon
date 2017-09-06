import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import md5 from 'crypto-md5';
 
@Component({
  selector: 'page-home',
  templateUrl: 'profile.html'
})
export class Profile {
 
    email: any;
    password: any;
    profilePicture: any = "https://www.gravatar.com/avatar/"
 
    constructor(public navCtrl: NavController) {
 
    }
 
    emailChanged(){
        this.profilePicture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex');
    }
 
}