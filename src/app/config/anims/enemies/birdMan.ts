export const Key = {
  birdmanIdle: 'birdmanIdle',
  birdmanRun: 'birdmanRun',
  birdmanJump: 'birdmanJump',
} as const;

export type AnimKey = (typeof Key)[keyof typeof Key];
