export type BubbleGameState = {
  score: number;
  maxBubbles: number;
  bubblesSpawned: number;
  combo: number;
  lastPopTime: number | null;
};