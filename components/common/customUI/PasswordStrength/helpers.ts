export const passwordLevel = {
  1: { label: "Weak", color: "#ff4d4f" },
  2: { label: "Medium", color: "#faad14" },
  3: { label: "Good", color: "#52c41a" },
  4: { label: "Strong", color: "#237804" },
} as const;

export const mapZxcvbnScore = (score: number) => {
  if (score <= 1) return 1;
  if (score === 2) return 2;
  if (score === 3) return 3;
  return 4;
};
