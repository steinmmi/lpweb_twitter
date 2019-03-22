import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {

  trends = [];
  constructor(
    private socket: Socket
  ) { }

  ngOnInit() {
    this.socket.emit('trends:data');
    this.socket.fromEvent('trends:data').subscribe((val: Array<any>) => {
      this.trends = val;
      console.log(this.trends);
    });
  }

}
