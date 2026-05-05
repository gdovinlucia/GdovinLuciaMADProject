import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonThumbnail} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { MyData } from '../services/my-data';
import { HttpOptions } from '@capacitor/core';
import { MyHttp } from '../services/my-http';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonThumbnail]
})
export class DetailsPage implements OnInit {

  constructor(private router: Router, private myData: MyData, private myHttp: MyHttp) { }

  //variables
  person: any;
  personID: any;
  credits: any = [];
  castPhotoURL: string = "https://image.tmdb.org/t/p/w500";
  posterURL: string = "https://image.tmdb.org/t/p/w500/";
  myApiKey: string = "4f031266ed2febb6c351e905ab037f74";

  ngOnInit() {
    this.getDetailsFromStorage();
  }

  //for refreshing data
  ionViewWillEnter() {
    this.getDetailsFromStorage();
  }

  //opneDetailsFromstorage() gets selected person from the storage
  async getDetailsFromStorage() {
    this.person = await this.myData.get("person");

    //person ID for Api
    this.personID = this.person.id;
    this.getPersonsDetails();
    this.getCreditsDetails();

  }

  //getPersonDetails() gets all the information about choosen cast or crew member
  async getPersonsDetails() {
    var options: HttpOptions = {
      url: "https://api.themoviedb.org/3/person/" + this.personID + "?api_key=" + this.myApiKey
    }

    var personDetails = await this.myHttp.get(options);
    this.person = personDetails.data;
  }

  //getCreditsDetails() gets movie credits
  async getCreditsDetails() {
    var creditsOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/person/" + this.personID + "/movie_credits?api_key=" + this.myApiKey
    }

    var movieCredits = await this.myHttp.get(creditsOptions);
    this.credits = movieCredits.data.cast;
  }

  //openMovieDetails() stored the selected movie and redirects to its Movie Details Page
  async openMovieDetails(movie: any) {
    await this.myData.set("movie", movie);
    this.router.navigate(['/movie-details']);
  }
  
  //icon navigating to Home Page
  async openHome() {
    this.router.navigate(['/home']);
  }

  //icon navigating to Favourites Page
  async openFavourites() {
    this.router.navigate(['/favourites']);
  }

}
