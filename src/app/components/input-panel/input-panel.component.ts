import { Component, ElementRef, ViewChild } from '@angular/core';
import { Wrestler } from 'src/app/models/wrestler';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-input-panel',
  templateUrl: './input-panel.component.html',
  styleUrls: ['./input-panel.component.scss']
})
export class InputPanelComponent {
  @ViewChild('input') input!: ElementRef<HTMLTextAreaElement>;

  // Default sample input
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
  get running() { return this.tournamentService.running; }

  /**
   * Starts a new tournament. Checks json validity of input string.
   * @param wrestlersInput The string in the input textbox.
   */
  async startTournament(wrestlersInput: string) {
    try {
      let wrestlers: Wrestler[] = JSON.parse(wrestlersInput);
      await this.tournamentService.startTournament(wrestlers);
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        alert("Input must be in valid JSON format!");
      } else {
        alert(error.message);
      }
    }
  }
}
