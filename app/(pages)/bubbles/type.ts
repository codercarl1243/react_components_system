
export type GameStatus = 'idle' | 'running' | 'finished' | "starting";

export type GameState = {
  status: GameStatus;
  score: number;
  timeLeft: number;
  bubblesSpawned: number;
  combo: number;
  lastPopTime: number | null;
};