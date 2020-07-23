import { CardState } from '../Card/CardState';
export interface IGameState {
  cards: JSX.Element[];
  cardStates: CardState[],
  playerTurn: number
}