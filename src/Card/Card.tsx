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
  private backSrc: string = back;
  constructor(props: ICardProps) {
    super(props)
    this.state = {
      "imgSrc": ace_of_spades
    }
    console.log(ace_of_spades);
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
          <img src={this.backSrc} alt="" className="flip-card-img"/>
        </div>
        <div className="flip-card-back">
          <img src={this.state.imgSrc} alt="" className="flip-card-img"/>
        </div>
        </div>
    </div>)
  } 
}