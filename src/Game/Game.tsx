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
    let suits: Suit[] = [Suit.spades, Suit.diamonds, Suit.clubs, Suit.hearts];
    for (let i: number = 1; i < 13; i++) {
      for (let i2 in suits) {
        this.state.cardStates.push(new CardState(i, suits[i2]));
        this.state.cards.push(
          <div className="card-container" key={i+suits[i2]} >
            <Card cardState={this.state.cardStates[this.state.cardStates.length-1]} onClick={() => { this.shuffle(); }}></Card>
          </div>
        );
      }
    }
  }

  componentDidMount() {
    // this.shuffle();
    this.state.cardStates[1].value = 5;
    this.setState({
      "cardStates": this.state.cardStates
    });
  }
  
  shuffle() {
    console.log("shuffling");
    this.cards.sort(() => Math.random() - 0.5);
    this.setState({
      "cards": this.cards
    });
  }
  
  render() {
    return (
      <div>
        {this.state.cards}
      </div>
    )
  }
}