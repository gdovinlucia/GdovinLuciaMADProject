import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonCard,IonCardSubtitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { MyData } from '../services/my-data';
import { MyHttp } from '../services/my-http';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonIcon, IonCard, IonCardSubtitle]
})
export class FavouritesPage implements OnInit {

  constructor(private router: Router, private myData: MyData, private myHttp: MyHttp) { }

  //variables
  title!: string; 
  movieID: any;
  favourites: any = [];
  posterURL: string = "https://image.tmdb.org/t/p/w500/";

  ngOnInit() {
    this.getFavouritesFromStorage();
    this.title = "Favourite Movies";
  }

  //getFavouritesFromStorage() retrieves stored values (movies add to favourites array)
  async getFavouritesFromStorage() {
    this.favourites = await this.myData.get("favourites");
  }
  
  //openMovieDetails() stores a selected movie based on its key and redirects to its Movie Details Page
  async openMovieDetails (favourite: any) {
    await this.myData.set("movie", favourite);
    this.router.navigate(['/movie-details']);
  }

  //icon navigating to Home Page
  async openHome() {
    this.router.navigate(['/home']);
  }
}
