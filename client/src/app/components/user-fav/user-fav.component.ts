import { Component, OnInit, Input } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-user-fav',
  templateUrl: './user-fav.component.html',
  styleUrls: ['./user-fav.component.css']
})
export class UserFavComponent implements OnInit {
  @Input() user: any;
  constructor(
    private favoritesService: FavoritesService
  ) { }

  ngOnInit() {
  }

  delete() {
    this.favoritesService.removeUser(this.user.id);
  }

}
