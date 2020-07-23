import { ICardState } from './ICardState';
import { Suit } from './Suit';

export class CardState implements ICardState {
  value: number = 1;
  suit: any = Suit.spades;
  faceUp: boolean;
  removed: boolean;

  constructor(value:number=1, suit=Suit.spades, faceUp:boolean=true, removed:boolean=false) {
    this.value = value;
    this.suit = suit;
    this.faceUp = faceUp;
    this.removed = removed;
  }
}