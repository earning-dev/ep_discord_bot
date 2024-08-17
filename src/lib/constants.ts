export const POINTS = {
  DAILY: 0.5,
  EVENTS: 5,
  COMPETITION: 10,
  DAILY_DSA: 1,
  SPECIAL_CONTRIBUTION: 5,
  TOP_MONTHLY_CONTRIBUTORS: 20,

  DEDUCT: {
    INAPPROPRIATE: [-5, -20],
    RULE_VIOLATION: [-10, -50],
    WARNING: [-5, -10, -20],
  },
};

export const FILE_PATHS = {
  USER_DB: { xlsx: 'src/db/user-points.xlsx', json: 'src/db/usersPoints.json' },
  DSA_QUES: {
    url: 'https://docs.google.com/spreadsheets/d/16_Bn5SPCd7DcE5W2FWc88yChQ31KItWPhqO93Tsew1k',
    path: 'src/db/ques.xlsx',
  },
};

export const EMOJIS = {
  success: '<:success:1269577777682714644>',
  fail: '<:fail:1269577804123471912>',
  fire: '<a:fire:1269578688928809014>',
};
