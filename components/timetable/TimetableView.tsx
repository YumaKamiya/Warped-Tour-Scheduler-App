
import React, { useState, useMemo } from 'react';
import { Artist, Day } from '../../types';
import { DAYS, STAGES, TIME_LABELS, TOTAL_TIMETABLE_HEIGHT, TIME_SLOT_HEIGHT_PER_MINUTE } from '../../constants';
import StageColumn from './StageColumn';
import Tabs from '../ui/Tabs';

interface TimetableViewProps {
  artists: Artist[];
  onSelectArtist: (artist: Artist) => void;
}

type WatchFilterType = 'ALL' | 'WATCH';

const TimetableView: React.FC<TimetableViewProps> = ({ artists, onSelectArtist }) => {
  const [selectedDay, setSelectedDay] = useState<Day>(Day.Day1);
  const [watchFilter, setWatchFilter] = useState<WatchFilterType>('ALL');

  const dayTabs = DAYS.map(d => ({ label: d, value: d }));
  const watchFilterTabs: { label: string; value: WatchFilterType }[] = [
    { label: 'All Artists', value: 'ALL' },
    { label: 'My Watchlist', value: 'WATCH' },
  ];

  const artistsForSelectedDayAndFilter = useMemo(() => {
    let filtered = artists.filter((artist) => artist.day === selectedDay);
    if (watchFilter === 'WATCH') {
      filtered = filtered.filter(artist => artist.watch);
    }
    return filtered;
  }, [artists, selectedDay, watchFilter]);

  return (
    <div className="flex flex-col h-full pt-4">
      <div className="px-4">
        <Tabs
          options={watchFilterTabs}
          selectedValue={watchFilter}
          onSelect={(value: WatchFilterType) => setWatchFilter(value)}
          className="mb-3"
        />
        <Tabs
            options={dayTabs}
            selectedValue={selectedDay}
            onSelect={(dayValue: Day) => setSelectedDay(dayValue)}
        />
      </div>

      <div className="flex-grow flex mt-2 overflow-hidden">
        {/* Time Labels Column */}
        <div className="w-16 flex-shrink-0 h-full relative" style={{ height: `${TOTAL_TIMETABLE_HEIGHT}px`}}>
          {TIME_LABELS.map((label, index) => (
            <div
              key={label}
              className="absolute text-xs text-slate-500 text-right pr-2 w-full"
              style={{ top: `${index * 60 * TIME_SLOT_HEIGHT_PER_MINUTE - 8}px` }} // -8 to center text vertically
            >
              {label}
            </div>
          ))}
        </div>

        {/* Stages Scroll Container */}
        <div className="flex-grow overflow-x-auto overflow-y-auto whitespace-nowrap pb-4 scrollbar-thin"> {/* scrollbar-thumb-gray-700 scrollbar-track-gray-800 removed, uses defaults from index.html */}
          <div className="flex h-full" style={{ height: `${TOTAL_TIMETABLE_HEIGHT}px` }}>
            {STAGES.map((stageId) => (
              <StageColumn
                key={`${selectedDay}-${watchFilter}-stage-${stageId}`}
                stageId={stageId}
                artists={artistsForSelectedDayAndFilter}
                onSelectArtist={onSelectArtist}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableView;