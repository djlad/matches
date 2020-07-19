import { CardState } from "./CardState";
import { Suit } from "./Suit";

export interface ICardProps {
  cardState: CardState;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}