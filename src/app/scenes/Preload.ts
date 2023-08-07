import { Play } from './Play';
import {
  AssetImage,
  AssetSprite,
  AssetSpriteSheet,
  AssetTileMap,
} from '../assets';

export class Preload extends Phaser.Scene {
  static key = 'Preload Scene';

  constructor() {
    super(Preload.key);
  }

  preload = () => {
    this.#loadImage(AssetImage.Key.tiles1);
    this.#loadImage(AssetImage.Key.tiles2);

    this.#loadTiledMapJson(AssetTileMap.Key.crystal);

    this.#loadSpriteSheet(AssetSpriteSheet.Key.playerAnim, {
      frameWidth: 32,
      frameHeight: 38,
      spacing: 32,
    });
    this.#loadSpriteSheet(AssetSpriteSheet.Key.birdmanAnim, {
      frameWidth: 48,
      frameHeight: 64,
      spacing: 16,
    });
    this.#loadSpriteSheet(AssetSpriteSheet.Key.snakerAnim, {
      frameWidth: 32,
      frameHeight: 64,
      spacing: 32,
    });
  };

  create = () => {
    this.scene.run(Play.key);
  };

  #loadImage = (key: AssetImage.Key) =>
    this.load.image(key, AssetImage.Path[key]);

  #loadSprite = (key: AssetSprite.Key) =>
    this.load.image(key, AssetSprite.Path[key]);

  #loadTiledMapJson = (key: AssetTileMap.Key) =>
    this.load.tilemapTiledJSON(key, AssetTileMap.Path[key]);

  #loadSpriteSheet = (
    key: AssetSpriteSheet.Key,
    frameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig,
  ) => {
    return this.load.spritesheet(key, AssetSpriteSheet.Path[key], frameConfig);
  };
}
