function isPowerOf2(num: number): boolean {
  return num > 0 && (num & (num - 1)) === 0;
}

function nearestHigherPowerOf2(num: number): number {
  if (num <= 1) return 1;

  return 1 << (32 - Math.clz32(num - 1));
}

function nearestLowerPowerOf2(num: number): number {
  if (num <= 1) return 0;

  return 1 << (31 - Math.clz32(num - 1));
}

export { isPowerOf2, nearestHigherPowerOf2, nearestLowerPowerOf2 };
