import { Move } from "./move";

export interface WrestlerInput {
  name: string,
  health: number,
  moves: Move[]
}
