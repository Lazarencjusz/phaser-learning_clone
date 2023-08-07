import playerAnim from '@assets/player/move_sprite_1.png';
import birdmanAnim from '@assets/enemy/enemy_sheet.png';
import snakerAnim from '@assets/enemy/enemy_sheet_2.png';

export const Key = {
  playerAnim: 'playerAnim',
  birdmanAnim: 'birdmanAnim',
  snakerAnim: 'snakerAnim',
} as const;

export type Key = (typeof Key)[keyof typeof Key];

export const Path: Record<Key, string> = {
  [Key.playerAnim]: playerAnim,
  [Key.birdmanAnim]: birdmanAnim,
  [Key.snakerAnim]: snakerAnim,
};
