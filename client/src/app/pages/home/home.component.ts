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
import { TimelineService } from 'src/app/services/timeline.service';

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
    private favoritesService: FavoritesService,
    private timelineService: TimelineService
    ) {}
  tweets = this.timelineService.getTweets();
  ngOnInit() {
  }

  clear() {
    this.timelineService.clearTweets();
  }
  setError(message: string) {
    this.errors = [];
    this.errors.push(message);
  }

  newSearch() {
    if (!this.favUsers) {
      if (this.search.length > 0) {
        this.actualSearch = this.search;
        this.timelineService.newSearch({
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
      this.timelineService.newSearch({
        q: undefined,
        rt: true,
        res: true,
        follow: ids.join(',')
      })
      this.setError('');
    } else {
      this.setError('Vous n\'avez personne en favoris !');
    }
    }
  }
}
