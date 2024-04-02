import { Component } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-matches-panel',
  templateUrl: './matches-panel.component.html',
  styleUrls: ['./matches-panel.component.scss']
})
export class MatchesPanelComponent {

  constructor(private tournamentService: TournamentService) {}
  
  get matches() { return this.tournamentService.matches; }
}
