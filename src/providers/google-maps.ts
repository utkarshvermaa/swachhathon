import { Injectable } from '@angular/core';
import { Connectivity } from './connectivity';
import { Geolocation } from 'ionic-native';

declare var google;

@Injectable()
export class GoogleMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string;
  infoWindows: any;

  constructor(public connectivityService: Connectivity) {
    this.infoWindows = [];
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivityService.isOnline()){

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
          }

          document.body.appendChild(script);  

        } 
      }
      else {

        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

      Geolocation.getCurrentPosition().then((position) => {

      	// UNCOMMENT FOR NORMAL USE
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        // let latLng = new google.maps.LatLng(40.713744, -74.009056);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);

      });

    });

  }

  disableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    document.addEventListener('online', () => {

      console.log("online");

      setTimeout(() => {

        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        } 
        else {
          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    }, false);

    document.addEventListener('offline', () => {

      console.log("offline");

      this.disableMap();

    }, false);

  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  addInfoWindowToMarker(marker,location) {
    var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' +location.title +  '</h1> <h3>Hygiene Score: ' + location.Hygiene_Score +'</h3><div class="stars"><form action="">'+
    '<input class="star star-5" id="star-5" type="radio" name="star"/>'+
    '<label class="star star-5" for="star-5"></label>'+
    '<input class="star star-4" id="star-4" type="radio" name="star"/>'+
    '<label class="star star-4" for="star-4"></label>'+
    '<input class="star star-3" id="star-3" type="radio" name="star"/>'+
    '<label class="star star-3" for="star-3"></label>'+
    '<input class="star star-2" id="star-2" type="radio" name="star"/>'+
    '<label class="star star-2" for="star-2"></label>'+
    '<input class="star star-1" id="star-1" type="radio" name="star"/>'+
    '<label class="star star-1" for="star-1"></label></form></div>'+'</div>';
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  addMarker(location): void {

    let latLng = new google.maps.LatLng(location.latitude, location.longitude);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    // marker.setMap(this.map);
    this.markers.push(marker); 
    this.addInfoWindowToMarker(marker,location);
     
      
  }

}

/*
'<div id="content"><h1 id="firstHeading" class="firstHeading">' +location.title +  '</h1> <h3>Hygiene Score: ' + location.Hygiene_Score +'</h3><div class="stars"><form action="">'+
    '<input class="star star-5" id="star-5" type="radio" name="star"/>'+
    '<label class="star star-5" for="star-5"></label>'+
    '<input class="star star-4" id="star-4" type="radio" name="star"/>'+
    '<label class="star star-4" for="star-4"></label>'+
    '<input class="star star-3" id="star-3" type="radio" name="star"/>'+
    '<label class="star star-3" for="star-3"></label>'+
    '<input class="star star-2" id="star-2" type="radio" name="star"/>'+
    '<label class="star star-2" for="star-2"></label>'+
    '<input class="star star-1" id="star-1" type="radio" name="star"/>'+
    '<label class="star star-1" for="star-1"></label></form></div>'+'</div>'

    '<h1>Pure CSS Star Rating Widget</h1><fieldset class="rating">'+
'    <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>'+
'    <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>'+
'    <input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>'+
'    <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>'+
'    <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>'+
'    <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>'+
'    <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>'+
'    <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>'+
'    <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>'+
'    <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label></fieldset>'

'<div id="content"><h1 id="firstHeading" class="firstHeading">' +location.title +  '</h1> <h3>Hygiene Score: ' + location.Hygiene_Score +'</h3>'+ 
    '<h1>Pure CSS Star Rating Widget</h1><fieldset class="rating">'+
    '    <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>'+
    '    <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>'+
    '    <input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>'+
    '    <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>'+
    '    <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>'+
    '    <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>'+
    '    <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>'+
    '    <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>'+
    '    <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>'+
    '    <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label></fieldset><div>'+
    */

