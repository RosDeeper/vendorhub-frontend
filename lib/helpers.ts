export const HOURS_OPTIONS = Array.from({ length: 24 }, (_, i) => ({
  label: i.toString().padStart(2, '0'),
  value: i.toString().padStart(2, '0'),
}));

export const MINUTES_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  label: (i * 5).toString().padStart(2, '0'),
  value: (i * 5).toString().padStart(2, '0'),
}));

export const WEEKDAY_OPTIONS = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];
