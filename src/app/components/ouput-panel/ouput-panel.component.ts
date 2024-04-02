import { Component } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-output-panel',
  templateUrl: './ouput-panel.component.html',
  styleUrls: ['./ouput-panel.component.scss']
})
export class OutputPanelComponent {

  constructor(private tournamentService: TournamentService) {}
  
  get matches() { return this.tournamentService.matches; }
  get messages() { return this.tournamentService.messages; }
}
