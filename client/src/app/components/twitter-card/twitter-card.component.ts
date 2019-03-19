import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-twitter-card',
  templateUrl: './twitter-card.component.html',
  styleUrls: ['./twitter-card.component.css']
})
export class TwitterCardComponent implements OnInit {
  @Input() tweet: Object;
  constructor() { }
  favorite: boolean;
  ngOnInit() {
  }

}
