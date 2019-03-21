import { Component } from '@angular/core';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private favoriteService: FavoritesService) {}
  title = 'client';
}
