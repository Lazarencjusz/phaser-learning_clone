import { mixinCollidable } from '@app/mixins/collidable';

export abstract class BaseEnemy extends Phaser.Physics.Arcade.Sprite {
  abstract GRAVITY: number;
  abstract SPEED: number;

  addColider = mixinCollidable.addColider;
  #raycast = mixinCollidable.raycast;

  #rayGrapgics: Phaser.GameObjects.Graphics;
  #currentPatrolDistance = 0;
  #positionRaycastDifference = 0;
  #reyPrecision = 1;
  #colideLayer: Phaser.Tilemaps.TilemapLayer;
  body: Phaser.Physics.Arcade.Body;
  speed = 35;
  patrolDistance = 300;
  reyLength: number | undefined;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);
  }

  protected baseInit = () => {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setGravityY(this.GRAVITY);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setImmovable(true);

    this.#rayGrapgics = this.scene.add.graphics({
      lineStyle: {
        width: 1,
        color: 0x5dfffd,
      },
    });

    this.#baseInitEvents();
  };

  #baseInitEvents = () => {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.#baseUpdate);
  };

  #baseUpdate = () => {
    this.#watchWalk();
  };

  #watchWalk = () => {
    if (!this.body || !this.body.onFloor()) {
      return;
    }
    this.setVelocityX(this.speed);

    this.#currentPatrolDistance += Math.abs(this.body.deltaX());

    const reachedPatrolDistance =
      this.#currentPatrolDistance >= this.patrolDistance;

    if (reachedPatrolDistance) {
      this.moveOposite();
      return;
    }

    this.#positionRaycastDifference += this.body.x - this.body.prev.x;

    if (Math.abs(this.#positionRaycastDifference) > this.#reyPrecision) {
      const hits = this.#raycast(this.#colideLayer, this.#rayGrapgics, {
        steepnes: 0.2,
        reyLength: this.reyLength,
      });
      this.#positionRaycastDifference = 0;

      if (!hits) {
        this.moveOposite();
      }
    }
  };
  protected moveOposite() {
    this.#currentPatrolDistance = 0;

    this.toggleFlipX();
    this.speed = -this.speed;
  }

  setPlatformColiders = (layer: Phaser.Tilemaps.TilemapLayer): this => {
    this.#colideLayer = layer;

    return this;
  };
}
