import { MoveType } from "./move-type";

export interface Move {
  name: string,
  damage: number,
  type: MoveType
}
