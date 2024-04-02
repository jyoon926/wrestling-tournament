export interface Move {
  name: string,
  damage: number,
  type: string
}

export interface WrestlerInput {
  name: string,
  health: number,
  moves: Move[]
}
