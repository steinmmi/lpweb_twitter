import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { TweetComponent } from './pages/tweet/tweet.component';
import { UserComponent } from './pages/user/user.component';
import { TrendsComponent } from './pages/trends/trends.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favoris', component: FavoritesComponent},
  { path: 'tweet/:id', component: TweetComponent},
  { path: 'user/:id', component: UserComponent},
  { path: 'trends', component: TrendsComponent},
  { path: 'search', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
