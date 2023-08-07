import crystal from '@assets/maps/main_map.json';

export const Key = {
  crystal: 'crystal',
} as const;

export type Key = (typeof Key)[keyof typeof Key];

export const Path: Record<Key, string> = {
  [Key.crystal]: crystal,
};
