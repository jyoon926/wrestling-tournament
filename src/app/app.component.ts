import { Component, ElementRef, ViewChild } from '@angular/core';
import { TournamentService } from './services/tournament.service';
import { Wrestler } from './models/wrestler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wrestling-tournament';
  @ViewChild('input') input!: ElementRef<HTMLTextAreaElement>;
  sampleInput = [
    {
      name: "Wrestler A",
      health: 100,
      moves: [
        { name: "Move A", damage: 45, type: "signature" },
        { name: "Move B", damage: 20, type: "signature" },
        { name: "Finishing Move", damage: 100, type: "finisher" }
      ]
    },
    {
      name: "Wrestler B",
      health: 100,
      moves: [
        { name: "Move A", damage: 45, type: "signature" },
        { name: "Move B", damage: 20, type: "signature" },
        { name: "Finishing Move", damage: 100, type: "finisher" }
      ]
    },
    {
      name: "Wrestler C",
      health: 100,
      moves: [
        { name: "Move A", damage: 45, type: "signature" },
        { name: "Move B", damage: 20, type: "signature" },
        { name: "Finishing Move", damage: 100, type: "finisher" }
      ]
    },
    {
      name: "Wrestler D",
      health: 100,
      moves: [
        { name: "Move A", damage: 45, type: "signature" },
        { name: "Move B", damage: 20, type: "signature" },
        { name: "Finishing Move", damage: 100, type: "finisher" }
      ]
    }
  ];

  constructor(private tournamentService: TournamentService) {}

  get wrestlers() { return this.tournamentService.wrestlers; }
  get messages() { return this.tournamentService.messages; }

  startTournament(wrestlersInput: string) {
    try {
      let wrestlers: Wrestler[] = JSON.parse(wrestlersInput);
      this.tournamentService.startTournament(wrestlers);
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        alert("Input must be in valid JSON format!");
      } else {
        alert(error.message);
      }
    }
  }
}
