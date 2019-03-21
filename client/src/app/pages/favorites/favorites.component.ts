import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(
    private socket: Socket,
    private favoritesService: FavoritesService
  ) { }
  options: [];

  favoritesUsers = this.favoritesService.getUsers();
  favoritesTweets = this.favoritesService.getTweets();

  proxyValue: any;
  onSelectionChanged(event$) {
    this.proxyValue = null;
    console.log(event$.option.value);
    this.favoritesService.addUser(event$.option.value);
   }
  ngOnInit() {
    this.socket.fromEvent('autocomplete:users').subscribe((val: []) => {
      this.options = val;
    });
  }
  onChange() {
    const value = this.proxyValue.name || this.proxyValue;
    if (value.length > 3) {
      this.socket.emit('autocomplete:users', value);
    }
  }

  test() {
    console.log("test");
  }
}
