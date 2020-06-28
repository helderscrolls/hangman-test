import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import * as hm from '../hangman.helper';
import { WordService } from './word.service';

/**
 * Holder of state information for the Hangman game.
 */
export interface StatusInfo {
  caption : string;
  btnCaption : string;
  hangWord : string;
  guessWord : string;
  guessSet : Set<string>;
  active : boolean;
  gamesPlayed : number;
  wins : number;
  losses : number;
}

@Injectable()
export class PlayGameService {

  /**
   * Holder of state information for the Hangman game.
   */
  public statusInfo : StatusInfo = {
    caption: 'Welcome to the Hangman Word Guessing Game!',
    btnCaption: 'New Game',
    hangWord: 'HANGMAN',
    guessWord: 'HANGMAN',
    guessSet: new Set<string>(),
    active: false,
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
  };

  /**
   * Monitors count of body parts.
   */
  private bodyPartsSubject = new Subject<number>();
  private bodyPartsObservable = this.bodyPartsSubject.asObservable();

  /**
   * Get reference to word source.
   * @param wordService
   */
  constructor(private wordService : WordService) {
  }

  /**
   * Handles game logic
   * @param letter string input
   */
  playLetter = (letter : string) : void => {
    console.log(`Play letter : ${letter}`);

    if (this.statusInfo.active) {
      let guessList = this.statusInfo.guessWord.split('');
      const hangList = this.statusInfo.hangWord.split('');
      guessList = hm.applyGuess(letter, guessList, hangList);
      this.statusInfo.guessWord = guessList.join('');

      const guessSet = this.statusInfo.guessSet;
      this.statusInfo.guessSet = hm.applyGuess_(letter, guessSet, hangList);
      this.bodyPartsSubject.next(this.statusInfo.guessSet.size);
      console.log(`Guess set   : ` + Array.from(this.statusInfo.guessSet));

      if (this.statusInfo.guessWord === this.statusInfo.hangWord) {
        this.statusInfo.wins++;
        this.statusInfo.gamesPlayed++;
        this.statusInfo.active = false;
        this.statusInfo.caption = (0 === this.statusInfo.guessSet.size)
          ? 'Congratulations ⇨ Fantastic play!'
          : 'Congratulations on your win!';
        this.statusInfo.btnCaption = 'Play Again';
      } else if (this.statusInfo.guessSet.size >= hm.maxGuesses()) {
        this.statusInfo.losses++;
        this.statusInfo.gamesPlayed++;
        this.statusInfo.active = false;
        this.statusInfo.caption = 'Better luck on the next word!';
        this.statusInfo.btnCaption = 'Retry';
        this.statusInfo.guessWord = this.statusInfo.hangWord;
      } else if (this.statusInfo.guessSet.size + 2 === hm.maxGuesses()) {
        this.statusInfo.caption = 'Two chances remaining!';
      } else if (this.statusInfo.guessSet.size + 1 === hm.maxGuesses()) {
        this.statusInfo.caption = 'Take care, only one chance left!';
      } else {
        this.statusInfo.caption = '';
      }
    }
  }

  /**
   * Handles new game initialization
   */
  newGame = () : void => {

    if (this.statusInfo.active && (0 < this.statusInfo.guessSet.size)) {
      this.statusInfo.losses++;
      this.statusInfo.gamesPlayed++;
    }

    this.statusInfo.caption = '';
    this.statusInfo.hangWord = this.wordService.randomWord();
    console.log(`New hangWord is \'${this.statusInfo.hangWord}\'!`);
    this.statusInfo.guessWord = '_'.repeat(this.statusInfo.hangWord.length);
    this.statusInfo.guessSet.clear();
    this.bodyPartsSubject.next(this.statusInfo.guessSet.size);
    this.statusInfo.active = true;
  }

  /**
   * Pass a routine that processes count of body parts.
   * @param consumer
   */
  consumeBodyParts(consumer : (parts : number) => any) : void {
    this.bodyPartsObservable.subscribe(consumer);
  }

  /**
   * returns statusInfo.guessSet value as an Array for component styling
   */
  arrayGuessSet() {
    return Array.from(this.statusInfo.guessSet);
  }
}
