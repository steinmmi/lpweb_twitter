import { Component, OnInit, Input } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-twitter-card',
  templateUrl: './twitter-card.component.html',
  styleUrls: ['./twitter-card.component.css']
})
export class TwitterCardComponent implements OnInit {
  @Input() tweet: Object;
  @Input() fav: boolean;

  constructor(
    private favoritesService: FavoritesService
  ) { }
  initState: boolean;
  favorite: boolean;
  ngOnInit() {
    this.initState = this.fav !== undefined ? true : false;
    this.favorite = this.initState;
    console.log(this.fav, this.favorite);
  }


  toggleFavorite() {
    if (this.initState) {
      this.favorite = false;
      this.favoritesService.removeTweet(this.tweet['id']);
    } else if (!this.initState && !this.favorite) {
      this.favorite = true;
      this.favoritesService.addTweet(this.tweet);
    }
  }
}
