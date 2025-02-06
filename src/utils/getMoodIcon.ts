export function getMoodIcon(mood: string): string {
  const icons = {
    procrastination: "🐌",
    distracted: "🦋",
    hyperfocus: "🎯",
    anxious: "😰",
    energetic: "⚡️",
    neutral: "📝",
  } as const;
  return icons[mood as keyof typeof icons] || icons.neutral;
}
