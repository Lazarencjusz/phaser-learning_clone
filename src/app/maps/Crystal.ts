import { AssetImage, AssetTileMap } from '@app/assets';
import { find } from 'lodash';
import { TiledLayers } from './types/TiledLayers';
import { ObjectLayers } from './types/ObjectLayers';
import { ObjectLayerKey } from './types/ObjectLayerKey';
import { TiledTileset } from './types/TiledTileset';

export class Crystal {
  #map: Phaser.Tilemaps.Tilemap;
  #tileset1: Phaser.Tilemaps.Tileset;
  #tileset2: Phaser.Tilemaps.Tileset;
  #layers: Record<TiledLayers, Phaser.Tilemaps.TilemapLayer>;
  #objects: Record<ObjectLayers, Phaser.Tilemaps.ObjectLayer>;

  get #widthInPixels() {
    return this.#map.widthInPixels;
  }

  get #bodyOffset() {
    return document.body.offsetWidth;
  }

  get mapOffset() {
    return this.#widthInPixels > this.#bodyOffset
      ? this.#widthInPixels - this.#bodyOffset
      : 0;
  }

  constructor(private scene: Phaser.Scene) {
    this.#init();
  }

  #init = () => {
    this.#map = this.scene.make.tilemap({ key: AssetTileMap.Key.crystal });

    this.#createTilesets();
    this.#createLayers();
  };

  #createLayers = () => {
    this.#objects = {
      [ObjectLayers.player]: this.#map.getObjectLayer(ObjectLayers.player),
      [ObjectLayers.enemySpawns]: this.#map.getObjectLayer(
        ObjectLayers.enemySpawns,
      ),
    };

    this.#layers = {
      [TiledLayers.platformsColider]: this.#map
        .createLayer(TiledLayers.platformsColider, this.#tileset1)
        // .setCollisionByExclusion([-1], true)
        .setCollisionByProperty({ collides: true })
        .setVisible(false),
      [TiledLayers.platforms]: this.#map.createLayer(
        TiledLayers.platforms,
        this.#tileset1,
      ),
      [TiledLayers.platformsBottom]: this.#map.createLayer(
        TiledLayers.platformsBottom,
        this.#tileset1,
      ),
      [TiledLayers.grass]: this.#map.createLayer(
        TiledLayers.grass,
        this.#tileset1,
      ),
      [TiledLayers.environment]: this.#map.createLayer(
        TiledLayers.environment,
        this.#tileset1,
      ),
      [TiledLayers.grass_top]: this.#map.createLayer(
        TiledLayers.grass_top,
        this.#tileset1,
      ),
      [TiledLayers.fance]: this.#map.createLayer(
        TiledLayers.fance,
        this.#tileset1,
      ),
    };
  };

  #createTilesets = () => {
    this.#tileset1 = this.#map.addTilesetImage(
      TiledTileset.main1,
      AssetImage.Key.tiles1,
    );
    this.#tileset2 = this.#map.addTilesetImage(
      TiledTileset.main2,
      AssetImage.Key.tiles2,
    );
  };

  get playerSpawnPoint() {
    return find(this.#objects[ObjectLayers.player].objects, {
      name: ObjectLayerKey.start,
    });
  }

  get finishPoint() {
    return find(this.#objects[ObjectLayers.player].objects, {
      name: ObjectLayerKey.finish,
    });
  }

  get platformsColiderLayer(): Phaser.Tilemaps.TilemapLayer {
    return this.#layers[TiledLayers.platformsColider];
  }

  get platformsLayer(): Phaser.Tilemaps.TilemapLayer {
    return this.#layers[TiledLayers.platforms];
  }

  get enemiesSpawnPoints() {
    return this.#objects[ObjectLayers.enemySpawns].objects;
  }
}
