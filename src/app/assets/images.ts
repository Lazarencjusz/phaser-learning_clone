import tiles1 from '@assets/maps/resources/main_lev_build_1.png';
import tiles2 from '@assets/maps/resources/main_lev_build_2.png';
import idlePlayer from '@assets/player/movements/idle01.png';

export const Key = {
  tiles1: 'tiles1',
  tiles2: 'tiles2',
  idlePlayer: 'idlePlayer',
} as const;

export type Key = (typeof Key)[keyof typeof Key];

export const Path: Record<Key, string> = {
  [Key.tiles1]: tiles1,
  [Key.tiles2]: tiles2,
  [Key.idlePlayer]: idlePlayer,
};
