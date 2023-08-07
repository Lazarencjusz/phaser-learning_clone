import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@common/consts";
import { Play, Preload } from "../scenes";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
  // pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: [Preload, Play],
};
