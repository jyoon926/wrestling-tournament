import { Injectable } from '@angular/core';
import { Wrestler } from '../models/wrestler';
import { WrestlerInput } from '../models/wrestler-input';
import confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private _wrestlers: Wrestler[] = [];
  private _matches: any[] = [];
  private _messages: string[] = [];
  private _running = false;

  constructor() { }

  get wrestlers() { return this._wrestlers; }
  get matches() { return this._matches; }
  get messages() { return this._messages; }
  get running() { return this._running; }

  /**
   * Starts a new tournament.
   * @param inputWrestlers An array of WresterInput objects.
   */
  async startTournament(inputWrestlers: WrestlerInput[]) {
    inputWrestlers = inputWrestlers.filter(w => Object.keys(w).length > 0);

    // Check array length
    if (inputWrestlers.length == 0 || inputWrestlers.length > 4)
      throw new Error("Wrestler count must be least 1 and at most 4.");

    // Reset data
    this._wrestlers = [];
    this._matches = [];
    this._messages = [];
    inputWrestlers.forEach(inputWrestler => {
      this._wrestlers.push(new Wrestler(inputWrestler));
    });

    // Run tournament
    this._running = true;
    let winner = await this.runTournament();
    this._messages.push(winner.name + "  wins the tournament!");
    await this.celebrate();
    this._running = false;
  }

  /**
   * Simulates a tournament and returns the winner.
   * @returns The winning wrestler.
   */
  async runTournament(): Promise<Wrestler> {
    let queue = this._wrestlers;
    let matches = 1;
    while (queue.length > 1) {
      if (queue.length >= 2) {
        const wrestler1 = queue.shift()!.copy();
        const wrestler2 = queue.shift()!.copy();
        const matchWinner = await this.runMatch(wrestler1, wrestler2, matches++);
        queue.push(matchWinner);
        this._messages.push("-----");
      }
    }
    let winner = queue.pop()!
    winner.setWinner();
    return winner;
  }

  /**
   * Simulates a match between two wrestlers.
   * @param wrestler1 The first wrestler.
   * @param wrestler2 The second wrestler.
   * @param matchNumber The number of the match.
   * @returns The winning wrester.
   */
  async runMatch(wrestler1: Wrestler, wrestler2: Wrestler, matchNumber: number): Promise<Wrestler> {
    let round = 1;
    let winner = wrestler1;

    this._messages.push("Match " + matchNumber + ": " + wrestler1.name + " vs. " + wrestler2.name);
    this._matches.push({
      wrestler1,
      wrestler2
    });

    await this.delay(0.5);

    while (wrestler1.health > 0 && wrestler2.health > 0) {
      this._messages.push("Round " + round + ":");
      await this.delay(0.2);

      let move1 = wrestler1.getRandomMove();
      wrestler2.damage(move1);
      this._messages.push(wrestler1.name + " performs " + move1.name + " on " + wrestler2.name + ". " + wrestler2.name + "'s health: " + wrestler2.health);
      await this.delay(0.2);

      // Wrestler1 wins
      if (wrestler2.health == 0) {
        this._messages.push(wrestler2.name + "'s health is 0. " + wrestler1.name + " wins!");
        winner = wrestler1;
        break;
      }

      let move2 = wrestler2.getRandomMove();
      wrestler1.damage(move2);
      this._messages.push(wrestler2.name + " performs " + move2.name + " on " + wrestler1.name + ". " + wrestler1.name + "'s health: " + wrestler1.health);
      await this.delay(0.2);

      // Wrestler2 wins
      if (wrestler1.health == 0) {
        this._messages.push(wrestler1.name + "'s health is 0. " + wrestler2.name + " wins!");
        winner = wrestler2;
        break;
      }
      
      round++;
    }

    this._matches.pop();
    this._matches.push({
      wrestler1,
      wrestler2,
      winner
    });

    return winner;
  }

  /**
   * Asynchronous delay function.
   * @param ms Delay length in seconds.
   */
  delay(s: number) {
    return new Promise( resolve => setTimeout(resolve, s * 1000) );
  }

  /**
   * Show confetti if confetti-canvas component exists.
   */
  async celebrate() {
    await this.delay(0.1);
    let canvas = document.getElementById("confetti-canvas");
    if (canvas) {
      let confettiBtn = confetti.create(canvas as HTMLCanvasElement);
      confettiBtn();
    }
  }
}
