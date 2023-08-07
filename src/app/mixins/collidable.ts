import { filter, isEmpty } from 'lodash';

export const mixinCollidable = {
  addColider<T extends Phaser.Physics.Arcade.Sprite | Phaser.GameObjects.Group>(
    this: T,
    colider: Phaser.Types.Physics.Arcade.ArcadeColliderType,
  ) {
    this.scene.physics.add.collider(this, colider);

    return this;
  },

  raycast<T extends Phaser.Physics.Arcade.Sprite>(
    this: T,
    colideLayer: Phaser.Tilemaps.TilemapLayer,
    rayGrapgics: Phaser.GameObjects.Graphics,
    { reyLength = 30, steepnes = 1 } = {},
  ) {
    const { x, y, width, halfHeight, facing } = this
      .body as Phaser.Physics.Arcade.Body;
    const line = new Phaser.Geom.Line();

    switch (facing) {
      case Phaser.Physics.Arcade.FACING_RIGHT:
        line.x1 = x + width;
        line.y1 = y + halfHeight;
        line.x2 = line.x1 + reyLength * steepnes;
        line.y2 = line.y1 + reyLength;
        break;
      case Phaser.Physics.Arcade.FACING_LEFT:
        line.x1 = x;
        line.y1 = y + halfHeight;
        line.x2 = line.x1 - reyLength * steepnes;
        line.y2 = line.y1 + reyLength;
        break;
    }

    let hits = false;
    if (colideLayer) {
      hits = !isEmpty(
        filter(
          colideLayer.getTilesWithinShape(line),
          (tile: Phaser.Tilemaps.Tile) => tile.index !== -1,
        ),
      );
    }

    rayGrapgics.clear();
    rayGrapgics.strokeLineShape(line);

    return hits;
  },
};
