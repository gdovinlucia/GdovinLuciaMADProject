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

  //variables
  movie: any;
  movieID: any;
  cast: any = [];
  crew: any = [];
  favourites: any = [];
  myApiKey: string = "4f031266ed2febb6c351e905ab037f74";
  castPhotoURL: string = "https://image.tmdb.org/t/p/w500";
  isFavourite!: boolean; //hide the button
  
  ngOnInit() {
    this.getMovieDetailsFromStorage();
  }

  //for refreshing data
  ionViewWillEnter() {
    this.getMovieDetailsFromStorage();
  }

  //getMovieDetailsFromStorage() retrieves a stored movie based on the entered value
  async getMovieDetailsFromStorage() {
    this.movie = await this.myData.get("movie");
    // console.log(this.movie); //checking
    this.movieID = this.movie.id;

    this.favourites = await this.myData.get("favourites");
    var foundFavourite = this.favourites.find((favourite: any) => favourite.id === this.movie.id);

    this.isFavourite = !foundFavourite;

    var options: HttpOptions = {
      url: "https://api.themoviedb.org/3/movie/" + this.movieID + "/credits?api_key=" + this.myApiKey
    }

    var castDetails = await this.myHttp.get(options);
    this.cast = castDetails.data.cast; //displaying a list of cast members
    this.crew = castDetails.data.crew; //displaying a list of crew members
  }
  
  //addToFavourites() stores a favourite movie
  async addToFavourites(movie: any) {
    this.favourites = await this.myData.get("favourites");

    //if a movie isn't in the favourites array, add it
    if (!this.favourites) {
      this.favourites = [];
    }

    var foundFavourite = this.favourites.find((favourite: any) => favourite.id === movie.id);

    if (!foundFavourite) {
      this.favourites.push(movie) //if not favourite, push it to the array
      await this.myData.set("favourites", this.favourites);
    }
    //display remove from favourites button
    this.isFavourite = false;
  }

  //removeFromFavourites() removes a stored movie from the favourites array
  async removeFromFavourites (movie: any) {
   // this.favourites = await this.myData.get("favourites");

    //using filter() method because pop() method only removes the last element (I googled the examples how to use it)
    this.favourites = this.favourites.filter((removeFavourite: any) => removeFavourite.id !== movie.id);
    await this.myData.set("favourites", this.favourites)

    this.isFavourite = true; //show favourite button
  }

  //openPersonDetails() stores the selected person (an actor feom the cast or a mmeber of the crew) and redirects to the Details Page
  async openPersonDetails(person: any) {
    await this.myData.set("person", person);
    this.router.navigate(['/details']);
  }

  //icon navigating to Home Page
  async openHome() {
    this.router.navigate(['/home']);
  }

  //icon navigating to Favourites Page
  async openFavourites() {
    this.router.navigate(['/favourites']);
  }

  //Source for the find() method: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
}

