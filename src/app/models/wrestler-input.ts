export enum MoveType {
  signature, finisher
}

export interface Move {
  name: string,
  damage: number,
  type: MoveType
}

export interface WrestlerInput {
  name: string,
  health: number,
  moves: Move[]
}
