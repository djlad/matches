import React from 'react';
import { Card } from '../Card/Card';
import { IGameProps } from './IGameProps';
import { IGameState } from './IGameState';
import "./Game.css";
export class Game extends React.Component<IGameProps, IGameState> {
  private cards: JSX.Element[]=[];
  constructor(props:IGameProps) {
    super(props);
    for (let i: number = 1; i < 14; i++) {
      this.cards.push(<div className="card-container"><Card></Card></div>);
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