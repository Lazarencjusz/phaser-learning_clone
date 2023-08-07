export const Key = {} as const;

export type Key = (typeof Key)[keyof typeof Key];

export const Path: Record<Key, string> = {};
