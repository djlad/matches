export class Topic {
  baseTopic: string;
  joinGame: string;
  oldPlayers: string;
  pickCard: string;
  shuffle: string;
  
  constructor(baseTopic: string) {
    this.baseTopic = baseTopic;
    this.joinGame = baseTopic + "/joinGame";
    this.oldPlayers = baseTopic + "/oldPlayers";
    this.pickCard = baseTopic + "/pickCard";
    this.shuffle = baseTopic + "/shuffle";
  }
}