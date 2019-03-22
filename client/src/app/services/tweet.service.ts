import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  
  constructor() { }

  textToLink(str: string): string {
    const regex = /(((http|https):\/\/\S*)$)|((^(http|https):\/\/\S*))/;
    return str.replace(regex, ' <a target="_blank" href="$&">Lien externe</a>');
  }
}
