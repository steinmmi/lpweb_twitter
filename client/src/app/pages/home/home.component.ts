import {
  Component,
  OnInit
} from '@angular/core';
import {
  Socket
} from 'ngx-socket-io';
import {
  FavoritesService
} from 'src/app/services/favorites.service';

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
  favUsers: boolean;
  errors: string[];
  constructor(
    private socket: Socket,
    private favoritesService: FavoritesService) {}
  tweets: Array < Object > = [];
  ngOnInit() {
    this.socket.emit('trends:data');
    this.socket.fromEvent('trends:data').subscribe(val => {
      console.log(val);
    });

    this.socket.fromEvent('new tweet').subscribe((val) => {
      this.tweets.unshift(val);
      if (this.tweets.length > 10) {
        this.tweets.pop();
      }
    });

  }
  setError(message: string) {
    this.errors = [];
    this.errors.push(message);
  }

  newSearch() {
    if (!this.favUsers) {
      if (this.search.length > 0) {
        this.actualSearch = this.search;
        this.socket.emit('new search', {
          q: this.search,
          rt: this.retweets,
          res: this.responses
        });
        this.search = '';
        this.setError('');
      } else {
        this.setError('Cette recherche est invalide');
      }
    } else {
      const ids = this.favoritesService.getUsers().map(el => el.id);
      if (ids.length > 0) {
      this.socket.emit('new search', {
        q: undefined,
        rt: true,
        res: true,
        follow: ids.join(',')
      });
      this.setError('');
    } else {
      this.setError('Vous n\'avez personne en favoris !');
    }
    }
  }
}
