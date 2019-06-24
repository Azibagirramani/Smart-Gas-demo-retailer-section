import { Component, AfterContentInit, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { AlertController,MenuController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router'

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterContentInit{

 map;
 currentUser
 @ViewChild('mapElement') mapElement;

  constructor(private route: Router, private alertCtrl: AlertController,private users: CustomerService) {}

  ngOnInit(){ 
      this.currentUser = this.users.get_current_user();
  }
   
  ngAfterContentInit(){

    navigator.geolocation.getCurrentPosition((location)=>{

      //getting current location
      let latitude = location.coords.latitude
      let longitude = location.coords.longitude
      this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: {lat: latitude, lng: longitude},
          zoom: 15,
          disableDefaultUI: true
        });

        const markerIcon = 'https://img.icons8.com/ultraviolet/40/000000/camping-gas-burner.png'

        //retailer marker 
        var marker = new google.maps.Marker({
          position: {lat: latitude, lng: longitude},
          map: this.map,
          icon: markerIcon,
        });

        var retailerCirlce = new google.maps.Circle({
          strokeColor: '#357df2',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#357df2',
          fillOpacity: 0.35,
          radius: 1000,
          map: this.map,
          center: {lat: latitude, lng: longitude},
        });

    })

  }


   //Alert message
   async UserAlert() {
    const  alert = await this.alertCtrl.create({
      message: 'Welcome back '+ this.currentUser.username +'<br>',
      buttons: ['OK']
    });
      return await alert.present()
  }
logout(){
  this.users.log_out();
  this.route.navigate(['login']);
}

}
