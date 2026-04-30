import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonInput, IonIcon, IonButtons, IonList, IonLabel, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle} from '@ionic/angular/standalone';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { MyData } from '../services/my-data';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonButton, IonItem, IonInput, IonIcon, IonButtons, IonList, IonLabel, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle],
})
export class HomePage {
  constructor(private myHttp: MyHttp) {}

  myApiKey: string = "4f031266ed2febb6c351e905ab037f74";
  options: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.myApiKey
  }
  trendingMovies: any = [];
  posterBase: string = "https://image.tmdb.org/t/p/w500/";

  ngOnInit() {
    this.getTrendingMovies();
  }

  async getTrendingMovies() {
    var result = await this.myHttp.get(this.options);
    // console.log(JSON.stringify(result))
    this.trendingMovies = result.data.results;
    // console.log(this.trendingMovies.poster_path);
  }
}
