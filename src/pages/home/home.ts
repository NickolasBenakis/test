import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather:any;
  city:string;
  state:string;

  apiKey="5f0af853e318d3a3";
  url;
  constructor(public navCtrl: NavController,
              private  http:HttpClient) {

    this.url='http://api.wunderground.com/api/'+this.apiKey+'/history_20171030/q';
  }

getWeather(city,state){

  return this.http.get(this.url+'/'+state+'/'+city+'.json')
}


  ngOnInit() {
    this.city="New York";
    this.state="NY";

    this.getWeather(this.city, this.state)
      .subscribe((weather: any) => {
        weather = weather.history.observations[0];
        console.log(weather);
        console.log("max Humidity : " +weather.hum +" % ");
        console.log("max Temp : "+(weather.tempi - 32) * (5/9)+ " C ");
        console.log("min Temp : "+(weather.tempm - 32) * (5/9) + " C ");
        console.log("Precipitation : "+weather.precipm +" mm ");


      });
  }


}

