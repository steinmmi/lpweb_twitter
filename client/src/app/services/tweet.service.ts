import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  
  constructor() { }

  textToLink(str: string): string {
    let regex = /([ ]((http|https):\/\/\S*))/;
    const n = str.replace(regex, ' <a target="_blank" href="$2">Lien externe</a>');
    regex = /(^(http|https):\/\/\S*)/;
    return n.replace(regex, '<a target="_blank" href="$&">Lien externe</a>');
  }
}
