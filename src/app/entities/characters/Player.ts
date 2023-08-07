import { AssetSpriteSheet } from '@app/assets';
import { AnimPlayer } from '@app/config/anims';
import { mixinCollidable } from '@app/mixins/collidable';

export class Player extends Phaser.Physics.Arcade.Sprite {
  static GRAVITY = 1650;
  static SPEED = 250;
  static JUMP = 550;

  addColider = mixinCollidable.addColider;

  body: Phaser.Physics.Arcade.Body;

  #cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  #jumpCount = 0;
  #maxJumps = 2;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, AssetSpriteSheet.Key.playerAnim);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.#init();
    this.#initEvents();
  }

  #initEvents = () => {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.#update);
  };

  #init = () => {
    this.setGravityY(Player.GRAVITY);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setSize(18, 35);

    this.#createAnims();

    this.#cursors = this.scene.input.keyboard.createCursorKeys();
  };

  #update = (time: number, delta: number) => {
    this.#watchMove();
  };

  #createAnims = () => {
    // run
    this.scene.anims.create({
      key: AnimPlayer.Key.playerRun,
      frameRate: 8,
      repeat: -1,
      frames: this.scene.anims.generateFrameNames(
        AssetSpriteSheet.Key.playerAnim,
        { start: 11, end: 16 },
      ),
    });
    // idle
    this.scene.anims.create({
      key: AnimPlayer.Key.playerIdle,
      frameRate: 8,
      repeat: -1,
      frames: this.scene.anims.generateFrameNames(
        AssetSpriteSheet.Key.playerAnim,
        { start: 0, end: 7 },
      ),
    });
    // jump
    this.scene.anims.create({
      key: AnimPlayer.Key.playerJump,
      frameRate: 5,
      repeat: 1,
      frames: this.scene.anims.generateFrameNames(
        AssetSpriteSheet.Key.playerAnim,
        { start: 17, end: 23 },
      ),
    });
  };

  get #isMovingX() {
    return this.body.velocity.x !== 0;
  }

  get #isMovingY() {
    return this.body.velocity.y !== 0;
  }

  #watchMove = (): void => {
    const { left, right } = this.#cursors;

    if (left.isDown) {
      this.setVelocityX(-Player.SPEED);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.setVelocityX(Player.SPEED);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    this.#watchJump();
    this.#watchPlayerAnim();
  };

  #watchPlayerAnim = () => {
    if (this.#jumpCount > 0) {
      this.play(AnimPlayer.Key.playerJump, true);
      return;
    }

    if (this.#isMovingX) {
      this.play(AnimPlayer.Key.playerRun, true);
    } else {
      this.play(AnimPlayer.Key.playerIdle, true);
    }
  };

  #watchJump = () => {
    const { space, up } = this.#cursors;
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);

    const isOnFloor = this.body.onFloor();

    if (isOnFloor) {
      this.#jumpCount = 0;
    }

    if (
      (isSpaceJustDown || isUpJustDown) &&
      (isOnFloor || this.#jumpCount < this.#maxJumps)
    ) {
      this.#jumpCount++;
      this.setVelocityY(-Player.JUMP);
    }
  };
}
