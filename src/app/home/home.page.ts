import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonInput, IonCard, IonCardContent, IonCardTitle, IonIcon, IonButtons, IonCardSubtitle} from '@ionic/angular/standalone';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyData } from '../services/my-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonButton, IonItem, IonInput, IonCard, IonCardContent, IonCardTitle, FormsModule, IonIcon, IonButtons, IonCardSubtitle],
})
export class HomePage {
  constructor(private myHttp: MyHttp, private myData: MyData, private router: Router) {}

  myStudentNumber: string = "G00473367";
  myApiKey: string = "4f031266ed2febb6c351e905ab037f74";
  keyword: string = "";
  options: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.myApiKey
  }
  trendingMovies: any = [];
  posterURL: string = "https://image.tmdb.org/t/p/w500/";
  titleTM!: string;

  ngOnInit() {
    this.getTrendingMovies();
    this.titleTM = "Today's Trending Movies";
  }

  //getTrendingMovies() shows the current trending movies before hitting search button
  async getTrendingMovies() {
    var result = await this.myHttp.get(this.options);
    // console.log(JSON.stringify(result))
    this.trendingMovies = result.data.results;
    // console.log(this.trendingMovies.poster_path);
  }

  //openMovies() shows the seached movies based on the keyword
  async openMovies() {
    
    //if the search hasn't been initialized (no keyword), display Trending Movies
    if (this.keyword == "") {
      this.titleTM = "Today's Trending Movies";
      await this.getTrendingMovies();
      return;
    }

    var searchOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/search/movie?query=" + this.keyword + "&api_key=" + this.myApiKey
    }
    var searchMovies = await this.myHttp.get(searchOptions);
    this.trendingMovies = searchMovies.data.results;
    this.titleTM = this.keyword + " Movies";
  }

  //icon navigeting to Favourites Page
  openFavourites() {
    this.router.navigate(['/favourites']);
  }

  //openMovieDetailsPage() stores the chosen movie and redirecting to Movie Details Page
  async openMovieDetailsPage(movie: any) {
    await this.myData.set("movie", movie);
    this.router.navigate(['/movie-details']);
  }
}