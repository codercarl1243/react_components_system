import type { ComponentType, Dispatch, SetStateAction } from "react";

export type ArcadeStatus =
  | 'idle'
  | 'starting'
  | 'running'
  | 'finished';

export type ArcadeCoreState = {
  status: ArcadeStatus;
  timeLeft: number;
  countdown: number | null;
};

export type ArcadeEffects = {
  triggerShake: () => void;
  isShaking: boolean;
  triggerTurbo: () => void;
  isTurbo: boolean;
}

export type ArcadeShellAPI = {
  handleStartGame: () => void;
  handleFinishGame: () => void;
  setGameState: Dispatch<SetStateAction<ArcadeCoreState>>;
  gameState: ArcadeCoreState;
  setEffectsEnabled: Dispatch<SetStateAction<boolean>>;
  effectsEnabled: boolean;
} & ArcadeEffects;


type ArcadeGame = ComponentType<{ arcade: ArcadeShellAPI }>;
type ArcadeMenu = ComponentType<{ arcade: ArcadeShellAPI }>;

export type ArcadeGameDefinition = {
  config: ArcadeGameConfig;
  Game: ArcadeGame;
  Menu?: ArcadeMenu;
};

export type ArcadeGameConfig = {
  id: string;
  label: string;
  initialTime: number;
};

