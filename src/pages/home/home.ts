import { Component } from '@angular/core';
import { MapPage } from '../map/map';
import { ListPage } from '../list/list';
import { Complaints } from '../complaints/complaints';
import { Profile } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root: any = Profile;
  tab2Root: any = MapPage;
  tab3Root: any = ListPage;
  tab4Root: any = Complaints;


  constructor(){

  }

}