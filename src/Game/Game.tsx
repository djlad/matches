import React from 'react';
import { Card } from '../Card/Card';
import { IGameProps } from './IGameProps';
import { IGameState } from './IGameState';
import "./Game.css";
import { Suit } from '../Card/Suit';
import { CardState } from '../Card/CardState';
export class Game extends React.Component<IGameProps, IGameState> {
  private cards: JSX.Element[]=[];
  constructor(props:IGameProps) {
    super(props);
    this.state = {
      "cards": this.cards,
      "cardStates": []
    };
    let c = 0;
    let suits: Suit[] = [Suit.spades, Suit.diamonds, Suit.clubs, Suit.hearts];
    for (let i: number = 1; i <= 13; i++) {
      for (let i2 in suits) {
        this.state.cardStates.push(new CardState(i, suits[i2], true));
        this.state.cards.push(
          <Card key={c} cardState={this.state.cardStates[this.state.cardStates.length - 1]} onClick={() => { this.flipCard(c) }}>
          </Card>
        );
        c++;
      }
    }
  }

  flipCard(cardId:number) {
    let newState: boolean = !this.state.cardStates[cardId].faceUp;
    this.state.cardStates[cardId].faceUp = newState;
    this.setState({
      "cardStates": this.state.cardStates
    });
  }

  componentDidMount() {
  }

  shuffle() {
    this.state.cardStates.sort(() => Math.random() - 0.5);
    this.setState({
      "cardStates": this.state.cardStates
    });
  }
  
  render() {
    for (let i: number = 0; i < this.state.cardStates.length; i++) {
      this.state.cards[i] = (
        <Card key={i} cardState={this.state.cardStates[i]} onClick={()=>{this.flipCard(i)}}></Card>
      );
    }
    return (
      <div>
        {this.state.cards}
      </div>
    )
  }
}