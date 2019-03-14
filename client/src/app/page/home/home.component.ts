import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private socket: Socket) { }
  tweets: Array<Object> = [];
  ngOnInit() {
    this.socket.fromEvent('new tweet').subscribe((val) => {
      this.tweets.push(val);
    });
  }

}
