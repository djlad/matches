import React from 'react';
import { Card } from '../Card/Card';
import { IGameProps } from './IGameProps';
import { IGameState } from './IGameState';
import "./Game.css";
import { Suit } from '../Card/Suit';
import { CardState } from '../Card/CardState';
import { Round } from '../Round/Round';
import { Player } from '../Player/Player';
import { Scores } from '../Scores/Scores';
import { connect, MqttClient } from 'mqtt';
import { Topic } from './Topic';
import { FiEdit } from 'react-icons/fi';

export class Game extends React.Component<IGameProps, IGameState> {
  private cards: JSX.Element[]=[];
  round: Round;
  flippedCards: number[] = [-1, -1];
  player: Player;
  incorrectFlip: boolean = false;
  client: MqttClient;
  topic: Topic;
  
  constructor(props: IGameProps) {
    super(props);
    this.player = new Player("Daniel");
    this.round = new Round([this.player]);
    this.state = {
      "cards": this.cards,
      "cardStates": [],
      "playerTurn": 0
    };
    const suits: Suit[] = [Suit.spades, Suit.diamonds, Suit.clubs, Suit.hearts];
    for (let i: number = 1; i <= 13; i++) {
      for (const i2 in suits) {
        this.state.cardStates.push(new CardState(i, suits[i2], false));
      }
    }
    const baseTopic: string = "matchesgame/1234";
    this.topic = new Topic(baseTopic);
    // const mqttUrl: string = "ws://test.mosquitto.org/";
    // const mqttUrl: string = "ws://localhost";
    const mqttUrl: string = "ws://pairs.azurewebsites.net";
    const port: number = 80;
    console.log("connecting to " + mqttUrl);
    this.client = connect(mqttUrl, {"port": port});
    // this.client = connect("ws://matchesmqtt.azurewebsites.net/", { "port": 80});
  }
  componentDidMount() {
    // this.player = new Player(window.prompt("What is your name?") ?? "Daniel");
    this.connectMqtt(this.topic.baseTopic);
    this.client.publish(this.topic.joinGame, JSON.stringify(this.player));
  }

  private connectMqtt(baseTopic: string) {
    this.client.subscribe(this.topic.baseTopic);
    this.client.subscribe(this.topic.joinGame);
    this.client.subscribe(this.topic.oldPlayers);
    this.client.subscribe(this.topic.pickCard);
    this.client.subscribe(this.topic.shuffle);
    this.client.on("message", (topic: string, message: Buffer) => {
      switch (topic) {
        case this.topic.joinGame:
          this.handleNewPlayer(topic, message.toString());
          break;
        case this.topic.oldPlayers:
          this.handleOldPlayers(topic, message.toString());
          break;
        case this.topic.pickCard:
          this.handlePickCard(topic, message.toString());
          break;
        case this.topic.shuffle:
          this.handleShuffle(topic, message.toString());
          break;
      }
    })
  }

  private getCardById(cardId: number): CardState {
    return this.state.cardStates[cardId];
  }

  handleNewPlayer = (topic: string, message: string) => {
    console.log("handle new player");
    this.round.players = [this.player];
    this.client.publish(this.topic.oldPlayers, JSON.stringify(this.player));
    // this.client.publish(this.topic.shuffle, JSON.stringify(this.state.cardStates));
  }

  handleOldPlayers = (topic: string, message: string) => {
    const parsed: Player = JSON.parse(message);
    const oldPlayer: Player = new Player(parsed.name);
    oldPlayer.created = parsed.created;
    oldPlayer.score = parsed.score;
    for (let i = 0; i < this.round.players.length; i++) {
      if (this.round.players[i].equals(oldPlayer)) {
        return;
      }
    }
    this.round.addPlayer(oldPlayer);
    console.log("setting state");
    this.setState({});
  }

  handlePickCard = (topic: string, message: string) => {
    const playerPicker: Player = JSON.parse(message);
    if (this.player.equals(playerPicker)) return;
    this.pickCard(playerPicker.lastPickedCard, true, playerPicker);
  }

  handleShuffle = (topic: string, message: string) => {
    const newCardStates: CardState[] = JSON.parse(message);
    this.setState({
      "cardStates": newCardStates
    });
  }

  handleChangeName = () => {
    this.player.name = prompt("What is your name?") ?? "Daniel";
    this.client.publish(this.topic.joinGame, JSON.stringify(this.player));
    this.client.publish(this.topic.oldPlayers, JSON.stringify(this.player));
    this.setState({});
  }

  pickCard(cardId: number, fromRemote: boolean = false, playerThatPicked=this.player) {
    console.log("picking card: " + cardId);
    // const currentPlayer: Player = this.round.getCurrentTurnPlayer();
    const currentPlayer: Player = playerThatPicked;
    if (fromRemote && this.player.created === currentPlayer.created) {
      return;
    } else {
      currentPlayer.lastPickedCard = cardId;
      if (this.player.created === currentPlayer.created) {
        this.client.publish(this.topic.pickCard, JSON.stringify(currentPlayer));
      }
    }
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
    this.client.publish(this.topic.shuffle, JSON.stringify(this.state.cardStates));
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
        <div className="player-name-display">
          <h3 className="lefters">{this.round.getCurrentTurnPlayer()?.name} {this.round.getCurrentTurnPlayer()?.created === this.player?.created ? "(you)" : ""}</h3>
          <FiEdit className="edit-button" onClick={this.handleChangeName}>Change Name</FiEdit>
        </div>
        <Scores players={this.round.players}></Scores>
        <button onClick={this.shuffle}>Shuffle</button>
        <div className="card-table">
          {this.state.cards}
        </div>
      </div>
    )
  }
}