import React from 'react';
import { Card } from '../Card/Card';
import { IGameProps } from './IGameProps';
import { IGameState } from './IGameState';
import "./Game.css";
import { Suit } from '../Card/Suit';
export class Game extends React.Component<IGameProps, IGameState> {
  private cards: JSX.Element[]=[];
  constructor(props:IGameProps) {
    super(props);
    let suits: Suit[] = [Suit.spades, Suit.diamonds, Suit.clubs, Suit.hearts];
    for (let i: number = 1; i < 13; i++) {
      for (let i2 in suits) {
        this.cards.push(
          <div className="card-container" key={i+suits[i2]} >
            <Card value={i} suit={suits[i2]} ></Card>
          </div>
        );
      }
    }
  }
  render() {
    return (
      <div>
        {this.cards}
      </div>
    )
  }
}