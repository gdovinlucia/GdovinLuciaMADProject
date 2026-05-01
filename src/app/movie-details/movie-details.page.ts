import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle} from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { Router } from '@angular/router';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonIcon, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class MovieDetailsPage implements OnInit {

  constructor(private myData: MyData, private router: Router, private myHttp: MyHttp) { }

  movie: any;
  movieID: any;
  cast: any = [];
  crew: any = [];
  myApiKey: string = "4f031266ed2febb6c351e905ab037f74";
  castPhotoURL: string = "https://image.tmdb.org/t/p/w500";
  
  ngOnInit() {
    this.getMovieDetailsFromStorage();
  }

  async getMovieDetailsFromStorage() {
    this.movie = await this.myData.get("movie");
    // console.log(this.movie);

    this.movieID = this.movie.id;

    var options: HttpOptions = {
      url: "https://api.themoviedb.org/3/movie/" + this.movieID + "/credits?api_key=" + this.myApiKey
    }

    var castDetails = await this.myHttp.get(options);
    this.cast = castDetails.data.cast;
    this.crew = castDetails.data.crew;

  }

  //icon navigeting to Home Page
  async openHome() {
    this.router.navigate(['/home']);
  }

  //icon navigeting to Favourites Page
  async openFavourites() {
    this.router.navigate(['/favourites']);
  }

}

