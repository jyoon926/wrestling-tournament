import { Move, WrestlerInput } from "./wrestler-input";

/**
 * Represents a wrestler.
 */
export class Wrestler {
  private _name: string;
  private _baseHealth: number;
  private _health: number;
  private _moves: Move[];
  private _isWinner = false;

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
  get isWinner() { return this._isWinner; }

  /**
   * Damages the wrestler based on the move.
   * @param move The receiving move.
   * @returns The damage done.
   */
  damage(move: Move): number {
    // Finisher moves have 50% chance of failing if health is above 45
    if (this._health > 45 && move.type == "finisher" && Math.random() > 0.5) {
      return 0;
    }
    let damage = Math.min(move.damage, this._health);
    this._health -= damage;
    return damage;
  }

  /**
   * Selects random move.
   * @returns The selected move.
   */
  getRandomMove(): Move {
    let index = Math.floor(Math.random() * this._moves.length);
    return this._moves[index];
  }

  /**
   * Resets the wrestler's health.
   */
  resetHealth(): void {
    this._health = this._baseHealth;
  }

  /**
   * Sets this wrestler as winner.
   */
  setWinner(): void {
    this._isWinner = true;
  }

  /**
   * Copies the current wrestler object.
   * @returns A copied wrestler with reset health.
   */
  copy() {
    return new Wrestler({
      name: this._name,
      health: this._baseHealth,
      moves: this._moves
    })
  }
}
