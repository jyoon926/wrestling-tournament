import { Move } from "./move";
import { MoveType } from "./move-type";
import { WrestlerInput } from "./wrestler-input";

export class Wrestler {
  private _name: string;
  private _baseHealth: number;
  private _health: number;
  private _moves: Move[];

  constructor(wrestler: WrestlerInput) {
    this._name = wrestler.name;
    this._baseHealth = wrestler.health;
    this._health = wrestler.health;
    this._moves = wrestler.moves;
  }

  get name() { return this._name; }

  get baseHealth() { return this._baseHealth; }

  get health() { return this._health; }

  get moves() { return this._moves; }

  damage(move: Move): number {
    // Finisher moves have 50% chance of failing if health is above 45
    if (this._health > 45 && move.type == MoveType.finisher && Math.random() > 0.5) {
      return 0;
    }
    let damage = Math.min(move.damage, this._health);
    this._health -= damage;
    return damage;
  }

  getRandomMove() {
    let index = Math.floor(Math.random() * this._moves.length);
    return this._moves[index];
  }

  resetHealth() {
    this._health = this._baseHealth;
  }
}
