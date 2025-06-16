
export enum Day {
  Day1 = "Day1",
  Day2 = "Day2",
}

export type StageId = 1 | 2 | 3 | 4 | 5 | 6;

export type WantLevel = 1 | 2 | 3 | 4 | 5;

export interface Artist {
  id: string;
  name: string;
  wantLevel: WantLevel;
  watch: boolean;
  memo: string;
  day: Day | null;
  stage: StageId | null;
  startTime: string; // "HH:MM" format
  endTime: string;   // "HH:MM" format
}

export enum View {
  Timetable = "TIMETABLE",
  ArtistList = "ARTIST_LIST",
}
