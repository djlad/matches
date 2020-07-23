import React from 'react';
import { Card } from '../Card/Card';
import { IGameProps } from './IGameProps';
import { IGameState } from './IGameState';
import "./Game.css";
import { Suit } from '../Card/Suit';
import { CardState } from '../Card/CardState';
import { Round } from '../Round/Round';
import { Player } from '../Player/Player';
export class Game extends React.Component<IGameProps, IGameState> {
  private cards: JSX.Element[]=[];
  round: Round;
  flippedCards: number[] = [-1, -1];
  player: Player;
  incorrectFlip: boolean = false;
  
  constructor(props:IGameProps) {
    super(props);
    this.player = new Player("Daniel");
    this.round = new Round([this.player, new Player("Alzina")]);
    this.state = {
      "cards": this.cards,
      "cardStates": [],
      "playerTurn": 0
    };
    let suits: Suit[] = [Suit.spades, Suit.diamonds, Suit.clubs, Suit.hearts];
    for (let i: number = 1; i <= 13; i++) {
      for (let i2 in suits) {
        this.state.cardStates.push(new CardState(i, suits[i2], false));
      }
    }
  }

  private getCardById(cardId: number): CardState {
    return this.state.cardStates[cardId];
  }

  pickCard(cardId: number) {
    if (this.incorrectFlip) {
      this.flipCard(this.flippedCards[0]);
      this.flipCard(this.flippedCards[1]);
      this.incorrectFlip = false;
    } else if (!this.round.wasPicked) {
      this.flippedCards[0] = cardId;
      this.flipCard(cardId);
      this.round.pickCard(
        this.getCardById(cardId)
      );
    } else {
      this.flipCard(cardId);
      if ( this.round.matchCard(
          this.getCardById(cardId))) {
        this.getCardById(cardId).removed = true;
        this.getCardById(this.flippedCards[0]).removed = true;
      } else {
        this.incorrectFlip = true;
        this.flippedCards[1] = cardId;
      }
    }
    if (this.round.turn !== this.state.playerTurn) {
      this.setState({
        "playerTurn": this.round.turn
      });
    }
  }

  flipCard(cardId: number) {
    let newState: boolean = !this.state.cardStates[cardId].faceUp;
    this.state.cardStates[cardId].faceUp = newState;
    this.setState({
      "cardStates": this.state.cardStates
    });
  }

  shuffle = () => {
    this.state.cardStates.sort(() => Math.random() - 0.5);
    this.setState({
      "cardStates": this.state.cardStates
    });
  }
  
  render() {
    for (let i: number = 0; i < this.state.cardStates.length; i++) {
      this.state.cards[i] = (
        <Card key={i}
          cardState={this.state.cardStates[i]}
          onClick={() => { this.pickCard(i) }}></Card>
      );
    }
    return (
      <div>
        <h3>{this.round.players[this.state.playerTurn].name} turn</h3>
        {this.round.players.map((player: Player) => {
          return <h5 key={player.name}>{player.name}: {player.score}</h5>;
        })}
        <button onClick={this.shuffle}>Shuffle</button>
        <div>
          {this.state.cards}
        </div>
      </div>
    )
  }
}