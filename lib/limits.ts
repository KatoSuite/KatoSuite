export const PLAN_LIMITS = {
  free: { aiGenerations: 3, children: 1, exports: false },
  printables: { aiGenerations: 15, children: 1, exports: true },
  library: { aiGenerations: 15, children: 1, exports: true },
  basic: { aiGenerations: 30, children: 2, exports: true },
  student: { aiGenerations: 40, children: 2, exports: true },
  home: { aiGenerations: 60, children: 3, exports: true },
  educator: { aiGenerations: 100, children: 3, exports: true },
  'center-max': { aiGenerations: 250, children: 6, exports: true },
} as const;

