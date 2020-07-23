import { CardState } from '../Card/CardState';
import { Player } from '../Player/Player';
export class Round {
  players: Player[] = [];
  turn: number = 0;
  pickedCard: CardState = new CardState();
  wasPicked: boolean = false;

  constructor(players: Player[]) {
    this.players = players;
  }

  pickCard(card: CardState) {
    this.pickedCard = card;
    this.wasPicked = true;
  }
  
  matchCard(card: CardState) {
    if (!this.wasPicked) {
      this.wasPicked = false;
      this.endTurn();
      return false;
    }
    if (card.value === this.pickedCard.value && card.suit !== this.pickedCard.suit) {
      this.wasPicked = false;
      this.players[this.turn].score += 2;
      return true;
    }
    this.endTurn();
    return false;
  }
  
  endTurn() {
    this.wasPicked = false;
    this.turn = (this.turn + 1) % this.players.length;
  }
}