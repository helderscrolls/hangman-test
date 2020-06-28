import { Component, AfterViewChecked } from '@angular/core';
import { PlayGameService, StatusInfo } from '../services/playgame.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements AfterViewChecked {
  /**
   * Holder of state information for the Hangman game.
   */
  statusInfo : StatusInfo;

  constructor(playGameService : PlayGameService) {
    this.statusInfo = playGameService.statusInfo;
  }

  /**
   * Keeps the status height from shrinking when caption is hidden.
   */
  ngAfterViewChecked() {
    const statusElement = document.getElementById('status-component');
    if (statusElement) {
      const positionInfo = statusElement.getBoundingClientRect();
      if (positionInfo) {
        statusElement.style.minHeight = positionInfo.height + 'px';
      }
    }
  }
}
