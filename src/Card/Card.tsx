import React from "react";
import { Suit } from "./Suit";
import { ICardState } from "./ICardState";
import { ICardProps } from "./ICardProps";
import ace_of_spades from "./images/ace_of_spades.svg";
import back from "./images/back.svg";
import "./Card.css";

export class Card extends React.Component<ICardProps, ICardState> {
  private suit: Suit = Suit.spades;
  private value: number = 1;
  constructor(props: ICardProps) {
    super(props)
    this.state = {
      "imgSrc": ace_of_spades
    }
  }
  
  private setSource(): void {
    this.setState((oldState: ICardState) => ({
      "imgSrc": "./images/" + this.value + "_of_" + this.suit + ".svg",
    }));
  }
  

  render() {
    return (<div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {/* <img src="{this.imgSrc}" alt="Avatar" style="width:300px;height:300px;"/> */}
          <img src={this.state.imgSrc} alt="Avatar" className="flip-card-inner"/>
        </div>
        <div className="flip-card-back">
          <img src={back} alt="Avatar" className="flip-card-back"/>
          {/* <h1>John Doe</h1> */}
          {/* <p>Architect & Engineer</p> */}
          {/* <p>We love that guy</p> */}
          {/* <p>{this.state.imgSrc}</p> */}
        </div>
        </div>
    </div>)
  } 
}