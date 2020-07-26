import React from "react";
import { Player } from "../Player/Player";
import { IScoreState } from "./IScoreState";
import "./Score.css"

export class Scores extends React.Component<IScoreState> {
  render() {
    return <div className="scores">
      {this.props.players.map((player: Player) => {
        return <h5 className="score" key={player.created}>{player.name}: {player.score}</h5>;
        })}
      </div>
  }
}