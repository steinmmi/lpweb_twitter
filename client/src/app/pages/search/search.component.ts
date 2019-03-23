import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private socket: Socket) { }
  query: string;
  results = [];
  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.q) {
        this.query = params.q;
        this.search();
      }
    });

    this.socket.fromEvent('search:tweets').subscribe((val: any) => {
      this.results = val;
    });
  }

  search() {
    if(this.query.length > 0) { 
      this.socket.emit('search:tweets', this.query);
    }
  }
}
