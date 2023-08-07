export const Key = {
  playerRun: 'playerRun',
  playerIdle: 'playerIdle',
  playerJump: 'playerJump',
} as const;

export type AnimKey = (typeof Key)[keyof typeof Key];
