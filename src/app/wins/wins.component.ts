import { Component, AfterViewChecked } from '@angular/core';
import { PlayGameService, StatusInfo } from '../services/playgame.service' ;


@Component({
  selector: 'app-wins',
  templateUrl: './wins.component.html',
  styleUrls: ['./wins.component.scss']
})
export class WinsComponent implements AfterViewChecked {

  statusInfo : StatusInfo ;
  constructor(playGameService : PlayGameService) {
    this.statusInfo = playGameService.statusInfo ;
  }

  ngAfterViewChecked() {
  }
}
