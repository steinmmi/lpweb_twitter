import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id: number;
  user: any;
  constructor(
    private route: ActivatedRoute,
    private tweetService: TweetService,
    private socket: Socket) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.socket.emit('user:data', this.id);
    });
    this.socket.fromEvent('user:data').subscribe((val) => {
      console.log(val);
      this.user = val;
      this.user.description = this.tweetService.textToLink(this.user.description);
    });
  }
}
