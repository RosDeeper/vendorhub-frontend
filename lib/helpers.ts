import dayjs from "dayjs";

export const formatTimestamp = (
  timestamp: number | string | undefined | null,
  format: string = 'DD-MM-YYYY'
): string => {
  if (!timestamp) return '--';

  const ts = Number(timestamp);
  const date = dayjs(ts);

  return date.isValid() ? date.format(format) : '--';
};

export const HOURS_OPTIONS = Array.from({ length: 24 }, (_, i) => ({
  label: i.toString().padStart(2, '0'),
  value: i.toString().padStart(2, '0'),
}));

export const MINUTES_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  label: (i * 5).toString().padStart(2, '0'),
  value: (i * 5).toString().padStart(2, '0'),
}));

export enum DAY_OF_WEEK {
  _MONDAY = 'MONDAY',
  _TUESDAY = 'TUESDAY',
  _WEDNESDAY = 'WEDNESDAY',
  _THURSDAY = 'THURSDAY',
  _FRIDAY = 'FRIDAY',
  _SATURDAY = 'SATURDAY',
  _SUNDAY = 'SUNDAY',
};

export const WEEKDAY_OPTIONS = [
  { label: "Monday", value: DAY_OF_WEEK._MONDAY },
  { label: "Tuesday", value: DAY_OF_WEEK._TUESDAY },
  { label: "Wednesday", value: DAY_OF_WEEK._WEDNESDAY },
  { label: "Thursday", value: DAY_OF_WEEK._THURSDAY },
  { label: "Friday", value: DAY_OF_WEEK._FRIDAY },
  { label: "Saturday", value: DAY_OF_WEEK._SATURDAY },
  { label: "Sunday", value: DAY_OF_WEEK._SUNDAY },
];

export const DATE_FORMAT = {
  DMY: 'DD-MM-YYYY',
  DMYHM: 'DD-MM-YYYY HH:mm',
  YMD: 'YYYY-MM-DD',
  T: 'HH:mm',
};
