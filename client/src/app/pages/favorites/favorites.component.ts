import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(
    private socket: Socket
  ) { }
  options: [];
  userSearch = '';
  ngOnInit() {
    this.socket.fromEvent('autocomplete:users').subscribe((val: []) => {
      this.options = val;
      console.log(val);
    });
  }
  onChange() {
    console.log(this.userSearch);
    if(this.userSearch.length > 3) {
    this.socket.emit('autocomplete:users', this.userSearch);
  }
  }
}
