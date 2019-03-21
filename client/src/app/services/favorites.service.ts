import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  tweets = [];
  users = [];

  addTweet(tweet: any) {
    this.tweets.push(tweet);
  }

  getTweets() {
    return this.tweets;
  }

  addUser(user: any) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }
  constructor() { }
}
