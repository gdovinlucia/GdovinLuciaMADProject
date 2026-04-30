import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonInput, IonCard, IonCardContent, IonCardTitle} from '@ionic/angular/standalone';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonButton, IonItem, IonInput, IonCard, IonCardContent, IonCardTitle, FormsModule],
})
export class HomePage {
  constructor(private myHttp: MyHttp) {}

  myApiKey: string = "4f031266ed2febb6c351e905ab037f74";
  keyword: string = "";
  options: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.myApiKey
  }
  trendingMovies: any = [];
  posterURL: string = "https://image.tmdb.org/t/p/w500/";
  titleTM!: string;
  hide!: boolean;


  ngOnInit() {
    this.getTrendingMovies();
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
}
