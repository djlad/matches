import { Suit } from "../Suit";

const imgSvgs = require.context("./images", true, /\.svg/);
const svgs = imgSvgs
  .keys ()
  .reduce((images: { [key: string]: any }, path ) => {
    images[path] = imgSvgs ( path )
    return images
  }, {} )

export class CardImages {
  valueToFaceCard(value:number):string {
    switch (value) {
      case 1:
        return "ace";
      case 11:
        return "jack";
      case 12:
        return "queen";
      case 13:
        return "king";
      default:
        return value.toString();
    }
  }
  getImage(value: number, suit: Suit) {
    let two:string = [11, 12, 13].indexOf(value) >= 0 ? "2" : "";
    let path = "./" + this.valueToFaceCard(value) + "_of_" + suit + two + ".svg";
    return svgs[path];
  }
}