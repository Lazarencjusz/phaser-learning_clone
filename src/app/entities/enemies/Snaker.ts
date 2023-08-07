import { AssetSpriteSheet } from '@app/assets';
import { AnimSnaker } from '@app/config/anims';
import { BaseEnemy } from './BaseEnemy';

export class Snaker extends BaseEnemy {
  GRAVITY = 1650;
  SPEED = 250;
  reyLength = 50;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, AssetSpriteSheet.Key.snakerAnim);

    this.#init();
  }

  #init = () => {
    this.baseInit();

    this.setSize(18, 60);
    this.setOffset(12, 5);

    this.#createAnims();
    this.play(AnimSnaker.Key.snakerIdle);
  };

  #createAnims = () => {
    // idle
    this.scene.anims.create({
      key: AnimSnaker.Key.snakerIdle,
      frameRate: 8,
      repeat: -1,
      frames: this.scene.anims.generateFrameNames(
        AssetSpriteSheet.Key.snakerAnim,
        { start: 0, end: 7 },
      ),
    });
    // run
    this.scene.anims.create({
      key: AnimSnaker.Key.snakerRun,
      frameRate: 8,
      repeat: -1,
      frames: this.scene.anims.generateFrameNames(
        AssetSpriteSheet.Key.snakerAnim,
        { start: 11, end: 16 },
      ),
    });
    // jump
    this.scene.anims.create({
      key: AnimSnaker.Key.snakerJump,
      frameRate: 8,
      repeat: -1,
      frames: this.scene.anims.generateFrameNames(
        AssetSpriteSheet.Key.snakerAnim,
        { start: 17, end: 23 },
      ),
    });
  };
}
