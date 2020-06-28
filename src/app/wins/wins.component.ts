import { Component, AfterViewChecked } from '@angular/core';
import { PlayGameService, StatusInfo } from '../services/playgame.service';


@Component({
  selector: 'app-wins',
  templateUrl: './wins.component.html',
  styleUrls: ['./wins.component.scss']
})
export class WinsComponent {
  /**
   * Holder of state information for the Hangman game.
   */
  statusInfo : StatusInfo;

  constructor(playGameService : PlayGameService) {
    this.statusInfo = playGameService.statusInfo;
  }
}
