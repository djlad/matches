import React from "react";
import { Suit } from "./Suit";
import { ICardState } from "./ICardState";
import { ICardProps } from "./ICardProps";
import ace_of_spades from "./CardImages/images/ace_of_spades.svg";
import back from "./CardImages/images/back.svg";
import "./Card.css";
import { CardImages } from './CardImages/CardImages';
import { CardState } from './CardState';

export class Card extends React.Component<ICardProps, ICardState> {
  private suit: Suit = Suit.spades;
  private value: number = 1;
  private backSrc: string = back;
  private cardImages: CardImages;

  constructor(props: ICardProps, cardImages: CardImages) {
    super(props)
    this.cardImages = new CardImages();
  }
  
  render() {
    return (
    <div className="flip-card" onClick={this.props.onClick}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={this.backSrc} alt="" className="flip-card-img"/>
        </div>
        <div className="flip-card-back">
          <img src={this.cardImages.getImage(this.props.cardState.value, this.props.cardState.suit)} alt="" className="flip-card-img"/>
        </div>
        </div>
    </div>)
  } 
}