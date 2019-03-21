import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  search = '';
  retweets = false;
  responses = false;
  actualSearch = '';
  constructor(private socket: Socket) { }
  tweets: Array<Object> = [];
  ngOnInit() {
    this.socket.fromEvent('new tweet').subscribe((val) => {
      this.tweets.unshift(val);
      if (this.tweets.length > 10) {
        this.tweets.pop();
      }
    });

  }

  newSearch() {
    this.actualSearch = this.search;
    this.socket.emit('new search', {
      q: this.search,
      rt: this.retweets,
      res: this.responses
    });
    this.search = '';
  }
}
