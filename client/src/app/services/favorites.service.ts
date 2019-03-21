import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor( private socket: Socket) {
    this.socket.fromEvent('favorites:tweets:add').subscribe((tweet) => {
      this.addTweet(tweet, false);
    });
    this.socket.fromEvent('favorites:tweets:remove').subscribe((tweet: string) => {
      this.removeTweet(parseInt(tweet, 10), false);
    });

    this.socket.fromEvent('favorites:users:add').subscribe((user) => {
      this.addUser(user, false);
    });
    this.socket.fromEvent('favorites:users:remove').subscribe((user: string) => {
      this.removeUser(parseInt(user, 10), false);
    });
  }
  tweets = [];
  users = [];


  addTweet(tweet: any, update = true) {
    this.tweets.push(tweet);

    if (update) {
      this.socket.emit('favorites:tweets:add', tweet);
    }
  }

  getTweets() {
    return this.tweets;
  }

  removeTweet(id: number, update = true) {
    this.tweets.forEach((tweet, index) => {
      if (tweet.id === id) {
        this.tweets.splice(index, 1);
        if (update) {
          this.socket.emit('favorites:tweets:remove', id);
        }
      }
    });
  }
  removeUser(id: number, update = true) {
    this.users.forEach((user, index) => {
      if (user.id === id) {
        this.users.splice(index, 1);
        if (update) {
          this.socket.emit('favorites:users:remove', id);
        }
      }
    });
  }
  addUser(user: any, update = true) {
    this.users.push(user);
    if (update) {
      this.socket.emit('favorites:users:add', user);
    }
  }

  getUsers() {
    return this.users;
  }
}
