
import { Artist, Day, StageId, WantLevel } from './types';

export const APP_TITLE = "Warped Tour Scheduler";

export const DAYS: Day[] = [Day.Day1, Day.Day2];
export const STAGES: StageId[] = [1, 2, 3, 4, 5, 6];
export const WANT_LEVELS: WantLevel[] = [1, 2, 3, 4, 5];

export const TIME_SLOTS_START_HOUR = 10; // 10:00
export const TIME_SLOTS_END_HOUR = 23;   // 23:00
export const TIME_SLOT_HEIGHT_PER_MINUTE = 2; // px: increased for better mobile tap targets

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: crypto.randomUUID(),
    name: "Punk Rock Superstars",
    wantLevel: 5,
    watch: true,
    memo: "Absolute must-see! Main stage headliner.",
    day: Day.Day1,
    stage: 1,
    startTime: "20:30",
    endTime: "21:30",
  },
  {
    id: crypto.randomUUID(),
    name: "Ska Revivalists",
    wantLevel: 4,
    watch: false,
    memo: "Could be fun, check out if no conflicts.",
    day: Day.Day1,
    stage: 3,
    startTime: "17:00",
    endTime: "17:45",
  },
  {
    id: crypto.randomUUID(),
    name: "Emo Throwback",
    wantLevel: 3,
    watch: true,
    memo: "Nostalgia trip!",
    day: Day.Day2,
    stage: 2,
    startTime: "19:00",
    endTime: "19:45",
  },
   {
    id: crypto.randomUUID(),
    name: "Hardcore Heroes",
    wantLevel: 4,
    watch: false,
    memo: "High energy, mosh pit expected.",
    day: Day.Day2,
    stage: 4,
    startTime: "16:00",
    endTime: "16:45",
  },
];

export const TIME_LABELS: string[] = [];
for (let i = TIME_SLOTS_START_HOUR; i <= TIME_SLOTS_END_HOUR; i++) {
  TIME_LABELS.push(`${String(i).padStart(2, '0')}:00`);
}

export const TOTAL_TIMETABLE_HEIGHT = (TIME_SLOTS_END_HOUR - TIME_SLOTS_START_HOUR) * 60 * TIME_SLOT_HEIGHT_PER_MINUTE;