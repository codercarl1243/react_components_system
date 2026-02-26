import BubblesGame from "@/components/arcade/bubblePop";
import BubblesMenu from "@/components/arcade/bubblePop/bubbles.menu";
import { ArcadeGameDefinition } from "@/components/arcade/type";

export const bubblepop: ArcadeGameDefinition = {
  config: {
    id: "bubbles",
    label: "Bubble Pop",
    initialTime: 30,
  },
  Game: BubblesGame,
  Menu: BubblesMenu,
};