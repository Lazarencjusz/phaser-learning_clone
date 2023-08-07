import { AssetSpriteSheet } from '@app/assets';
import { AnimBirdman } from '@app/config/anims';
import { BaseEnemy } from './BaseEnemy';

export class BirdMan extends BaseEnemy {
  GRAVITY = 1650;
  SPEED = 250;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, AssetSpriteSheet.Key.birdmanAnim);

    this.#init();
  }

  #init = () => {
    this.baseInit();

    this.setOrigin(0.3, 1);

    this.setBodySize(20, 45);
    this.setOffset(7, 20);

    this.#createAnims();
    this.play(AnimBirdman.Key.birdmanIdle);
  };

  #createAnims = () => {
    // idle
    this.scene.anims.create({
      key: AnimBirdman.Key.birdmanIdle,
      frameRate: 8,
      repeat: -1,
      frames: this.scene.anims.generateFrameNames(
        AssetSpriteSheet.Key.birdmanAnim,
        { start: 0, end: 7 },
      ),
    });
    // run
    this.scene.anims.create({
      key: AnimBirdman.Key.birdmanIdle,
      frameRate: 8,
      repeat: -1,
      frames: this.scene.anims.generateFrameNames(
        AssetSpriteSheet.Key.birdmanAnim,
        { start: 11, end: 16 },
      ),
    });
    //jump
    this.scene.anims.create({
      key: AnimBirdman.Key.birdmanIdle,
      frameRate: 8,
      repeat: -1,
      frames: this.scene.anims.generateFrameNames(
        AssetSpriteSheet.Key.birdmanAnim,
        { start: 17, end: 23 },
      ),
    });
  };

  protected moveOposite(): void {
    super.moveOposite();
    this.setOffset(this.flipX ? 20 : 7, this.body.offset.y);
  }
}
