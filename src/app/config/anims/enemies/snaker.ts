export const Key = {
  snakerIdle: 'snakerIdle',
  snakerRun: 'snakerRun',
  snakerJump: 'snakerJump',
} as const;

export type AnimKey = (typeof Key)[keyof typeof Key];
