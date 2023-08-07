import { BaseEnemy } from '@app/entities/enemies/BaseEnemy';
import { BirdMan } from '@app/entities/enemies/BirdMan';
import { Snaker } from '@app/entities/enemies/Snaker';
import { TiledEnemyNames } from '@app/maps/types/TiledEnemyNames';
import { mixinCollidable } from '@app/mixins/collidable';

export class Enemies extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  addColider = mixinCollidable.addColider;

  static types: Record<TiledEnemyNames, new (...args: any) => BaseEnemy> = {
    [TiledEnemyNames.birdMan]: BirdMan,
    [TiledEnemyNames.snaker]: Snaker,
  };
}
