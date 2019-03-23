import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  tweet: any;
  user: any;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private socket: Socket) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.socket.emit('tweet:data', this.id);
    });
    this.socket.fromEvent('tweet:data').subscribe((val) => {
      this.tweet = val;
      console.log(this.tweet);
      
      this.socket.emit('user:data', this.tweet.user.id);
    });
    this.socket.fromEvent('user:data').subscribe((val) => {
      this.user = val;
    });
  }

}
