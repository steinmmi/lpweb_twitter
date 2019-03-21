import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-fav',
  templateUrl: './user-fav.component.html',
  styleUrls: ['./user-fav.component.css']
})
export class UserFavComponent implements OnInit {
  @Input() user: any;
  constructor() { }

  ngOnInit() {
  }

}
