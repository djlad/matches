export class Player {
  constructor(name:string) {
    this.name = name;
  }
  name: string = "playerName";
  score: number = 0;
  created: number = Date.now();
  lastPickedCard: number = -1;

  equals(otherPlayer: Player): boolean {
    return (this.name === otherPlayer.name &&
      this.score === otherPlayer.score &&
      this.created === otherPlayer.created);
  }
}