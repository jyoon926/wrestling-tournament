import { Injectable } from '@angular/core';
import { Wrestler } from '../models/wrestler';
import { WrestlerInput } from '../models/wrestler-input';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private _wrestlers: Wrestler[] = [];
  private _bracket = [];
  private _messages: string[] = [];

  constructor() { }

  get wrestlers() { return this._wrestlers; }
  get bracket() { return this._bracket; }
  get messages() { return this._messages; }

  /**
   * Starts a new tournament.
   * @param inputWrestlers An array of WresterInput objects.
   */
  startTournament(inputWrestlers: WrestlerInput[]) {
    // Check array length
    if (inputWrestlers.length == 0 || inputWrestlers.length > 4)
      throw new Error("Array length must be at least 1 and at most 4.");

    // Reset data
    this._wrestlers = [];
    this._messages = [];
    inputWrestlers.forEach(inputWrestler => {
      this._wrestlers.push(new Wrestler(inputWrestler));
    });

    // Run tournament
    let winner = this.runTournament();
    this._messages.push(winner.name + "  wins the tournament!");
  }

  /**
   * Simulates a tournament and returns the winner.
   * @returns The winning wrestler.
   */
  runTournament(): Wrestler {
    let queue = this._wrestlers;
    let matches = 1;
    while (queue.length > 1) {
      if (queue.length >= 2) {
        let matchWinner = this.runMatch(queue.shift()!, queue.shift()!, matches++);
        queue.push(matchWinner);
      }
    }
    return queue.pop()!;
  }

  /**
   * Simulates a match between two wrestlers.
   * @param wrestler1 The first wrestler.
   * @param wrestler2 The second wrestler.
   * @param matchNumber The number of the match.
   * @returns The winning wrester.
   */
  runMatch(wrestler1: Wrestler, wrestler2: Wrestler, matchNumber: number): Wrestler {
    let round = 1;
    let winner: Wrestler;

    this._messages.push("Match " + matchNumber + ": " + wrestler1.name + " vs. " + wrestler2.name);

    while (wrestler1.health > 0 && wrestler2.health > 0) {
      this._messages.push("Round " + round + ":");

      let move1 = wrestler1.getRandomMove();
      wrestler2.damage(move1);
      this._messages.push(wrestler1.name + " performs " + move1.name + " on " + wrestler2.name + ". " + wrestler2.name + "'s health: " + wrestler2.health);

      // Wrestler1 wins
      if (wrestler2.health == 0) {
        this._messages.push(wrestler2.name + "'s health is 0. " + wrestler1.name + " wins!");
        winner = wrestler1;
        break;
      }

      let move2 = wrestler2.getRandomMove();
      wrestler1.damage(move2);
      this._messages.push(wrestler2.name + " performs " + move2.name + " on " + wrestler1.name + ". " + wrestler1.name + "'s health: " + wrestler1.health);

      // Wrestler2 wins
      if (wrestler1.health == 0) {
        this._messages.push(wrestler1.name + "'s health is 0. " + wrestler2.name + " wins!");
        winner = wrestler2;
        break;
      }
      
      round++;
    }

    return winner!;
  }
}
