import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayGameService, StatusInfo } from '../services/playgame.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  statusInfo : StatusInfo ;

  // 'New Game' button events are pushed to this subject.
  public newGameSubject = new Subject() ;

  constructor(playGameService : PlayGameService) {
    this.statusInfo = playGameService.statusInfo ;
  }
  ngOnInit() {}

  // Pass a routine that processes New Game requests.
  consumeNewGame(consumer : () => any) : void {
    this.newGameSubject.asObservable().subscribe(consumer) ;
  }
}
