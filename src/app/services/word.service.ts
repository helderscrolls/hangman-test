import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import * as R from 'ramda';


@Injectable()
export class WordService {
  private static baseUrl() : string {
    const re = new RegExp(/^.*\//);
    return re.exec(window.location.href)[0];
  }

  private words : Array<string>;

  constructor(private http : HttpClient) {
    http.get(WordService.baseUrl() + 'resources/dictionaryWords.txt', { responseType: 'text' })
      .pipe(
        map(text => text.toUpperCase()),
        map(text => text.split('\n')),
        map(words => R.map(R.trim, words))
      )
      .subscribe(
        words => this.words = words,
        err => console.error(`Hangman word list loading error - ${err}.`),
        () => console.log('Hangman word list loaded!')
      );
  }

  /**
   * Generate a random integer in range 0 to max.
   * @param max
   */
  private static getRandomInt(max : number) : number {
    return Math.floor(Math.random() * (max + 1));
  }

  /**
   * A single random word for the 'words' array.
   */
  randomWord() : string {
    let word = 'HANGMAN';
    if (0 < this.words.length) {
      const pos : number = WordService.getRandomInt(this.words.length - 1);
      word = this.words[pos];
    }
    return word;
  }
}
