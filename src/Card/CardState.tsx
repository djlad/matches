import { ICardState } from './ICardState';
import { Suit } from './Suit';

export class CardState implements ICardState {
  value: number = 1;
  suit: any = Suit.spades;

  constructor(value:number=1, suit=Suit.spades) {
    this.value = value;
    this.suit = suit;
  }
}