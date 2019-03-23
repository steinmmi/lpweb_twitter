import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  tweets: any[] = [];
  constructor(
    private socket: Socket
  ) {
    this.socket.fromEvent('new tweet').subscribe((val) => {
      this.addTweet(val);
      if (this.getTweets().length > 100) {
        this.removeLastTweet();
      }
    });
  }

  newSearch(search: any) {
    this.socket.emit('new search', search);
  }
  addTweet(tweet) {
    this.tweets.unshift(tweet);
  }

  clearTweets() {
    this.tweets.length = 0;
  }

  getTweets() {
    return this.tweets;
  }

  removeLastTweet() {
    this.tweets.pop();
  }
}
