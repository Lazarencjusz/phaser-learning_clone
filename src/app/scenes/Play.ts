import { Player } from '@app/entities/characters/Player';
import { Enemies } from '@app/groups/Enemies';
import { Crystal } from '@app/maps/Crystal';
import { TiledEnemyNames } from '@app/maps/types/TiledEnemyNames';
import { filter, forEach, map } from 'lodash';
export class Play extends Phaser.Scene {
  static key = 'Play Scene';
  #map: Crystal;
  #player: Player;
  #enemies: Enemies;

  constructor() {
    super(Play.key);
  }

  preload = () => {};

  line: Phaser.Geom.Line;
  graphics: Phaser.GameObjects.Graphics;
  plotting = false;

  create = () => {
    this.#map = new Crystal(this);
    this.#player = new Player(
      this,
      this.#map.playerSpawnPoint.x,
      this.#map.playerSpawnPoint.y,
    );

    this.#createEnemies();
    this.#setCollisions();
    this.#setupCamera();
    this.#createLevelEnd();

    this.graphics = this.add.graphics({
      lineStyle: {
        width: 1,
        color: 0x00ff00,
      },
      x: 0,
      y: 0,
    });
    // .setScrollFactor(0, 0);
    this.line = new Phaser.Geom.Line();

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.plotting = true;
      this.line.x1 = pointer.worldX;
      this.line.y1 = pointer.worldY;
    });
    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      this.plotting = false;
      // this.line.x2 = pointer.worldX;
      // this.line.y2 = pointer.worldY;
      this.#map.platformsLayer.forEachTile((tile) => {
        tile.setCollision(false);
      });
      const tileHits = this.#map.platformsLayer.getTilesWithinShape(this.line);
      const tilesHit = filter(tileHits, (tile) => tile.index !== -1);

      forEach(tilesHit, (tile) => {
        tile.setCollision(true);
      });

      if (tilesHit.length > 0) {
        this.graphics.lineStyle(1, 0xff0000);
      } else {
        this.graphics.lineStyle(1, 0x00ff00);
      }

      const collidingTileColor = new Phaser.Display.Color(243, 134, 48, 200);

      this.#map.platformsLayer.renderDebug(this.graphics, {
        tileColor: null,
        collidingTileColor,
      });

      console.log(tilesHit);
      // console.log('end', pointer);
      // this.graphics.strokeLineShape(this.line);
    });
  };

  update = () => {
    // return;
    // console.log(
    //   this.input.activePointer.worldX,
    //   this.input.activePointer.worldY,
    // );
    if (this.plotting) {
      const pointer = this.input.mousePointer;
      this.line.x2 = pointer.worldX;
      this.line.y2 = pointer.worldY;
      this.graphics.clear();
      this.graphics.strokeLineShape(this.line);
    }
  };

  #createEnemies = () => {
    this.#enemies ??= new Enemies(this);
    this.#enemies.addMultiple(
      map(this.#map.enemiesSpawnPoints, (point) => {
        const Enemy = Enemies.types[point.type as TiledEnemyNames];
        return new Enemy(this, point.x, point.y).setPlatformColiders(
          this.#map.platformsColiderLayer,
        );
      }),
    );
  };

  #setCollisions = () => {
    this.#player.addColider(this.#map.platformsColiderLayer);

    this.#enemies
      .addColider(this.#map.platformsColiderLayer)
      .addColider(this.#player);
  };

  #setupCamera = () => {
    this.physics.world.setBounds(
      0,
      0,
      +this.game.config.width + this.#map.mapOffset,
      +this.game.config.height + 100,
    );
    this.cameras.main
      .setBounds(
        0,
        0,
        +this.game.config.width + this.#map.mapOffset,
        +this.game.config.height + 100,
      )
      .setZoom(1.5)
      .startFollow(this.#player);
  };

  #createLevelEnd = () => {
    const eol = this.physics.add
      .sprite(this.#map.finishPoint.x, this.#map.finishPoint.y, 'end')
      .setAlpha(0)
      .setSize(5, 100);

    const overlap = this.physics.add.overlap(this.#player, eol, () => {
      console.log('--- FINISH');
      overlap.active = false;
    });
  };
}
