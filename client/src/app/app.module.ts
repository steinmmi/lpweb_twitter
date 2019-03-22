import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatCardModule, MatButtonModule, MatIconModule,
  MatSidenavModule, MatListModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatAutocompleteModule, MatSlideToggleModule, MatDividerModule, MatExpansionModule
} from '@angular/material';
import { TwitterCardComponent } from './components/twitter-card/twitter-card.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { UserFavComponent } from './components/user-fav/user-fav.component';
import { TweetComponent } from './pages/tweet/tweet.component';
import { UserComponent } from './pages/user/user.component';
const config: SocketIoConfig = { url: 'http://' + window.location.hostname + ':3000', options: {withCredentials: false} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TwitterCardComponent,
    MainNavComponent,
    FavoritesComponent,
    UserFavComponent,
    TweetComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NoopAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
