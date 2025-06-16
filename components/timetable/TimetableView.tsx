
import React, { useState, useMemo } from 'react';
import { Artist, Day } from '../../types';
import { DAYS, STAGES, TIME_LABELS, TOTAL_TIMETABLE_HEIGHT, TIME_SLOT_HEIGHT_PER_MINUTE, TIME_SLOTS_START_HOUR } from '../../constants';
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
      {/* Tabs: Centered and with reduced vertical padding */}
      <div className="px-4 flex flex-col items-center">
        <Tabs
          options={watchFilterTabs}
          selectedValue={watchFilter}
          onSelect={(value: WatchFilterType) => setWatchFilter(value)}
          className="mb-2 justify-center" // Reduced margin-bottom
          tabClassName="py-1.5 sm:py-2 text-xs sm:text-sm" // Reduced padding
          activeTabClassName="py-1.5 sm:py-2 text-xs sm:text-sm"
        />
        <Tabs
            options={dayTabs}
            selectedValue={selectedDay}
            onSelect={(dayValue: Day) => setSelectedDay(dayValue)}
            className="justify-center"
            tabClassName="py-1.5 sm:py-2 text-xs sm:text-sm" // Reduced padding
            activeTabClassName="py-1.5 sm:py-2 text-xs sm:text-sm"
        />
      </div>

      {/* Timetable Grid Area: Main scroll container for the grid */}
      <div className="flex-grow flex mt-2 overflow-auto scrollbar-thin">
        {/* This inner div sets the total scrollable height and allows flex layout for sticky column + stages */}
        <div className="relative flex" style={{ height: `${TOTAL_TIMETABLE_HEIGHT}px` }}>
          {/* Time Labels Column (Sticky Left) */}
          <div
            className="sticky left-0 z-20 w-12 flex-shrink-0 bg-slate-50 border-r border-slate-200" /* Reduced width from w-16, added bg for stickiness */
          >
            {/* Relative container for absolutely positioned time labels */}
            <div className="relative h-full">
              {/* Offset the first label to align with the stage content area which is below stage headers */}
              {/* The stage headers are 40px (h-10). The time labels should start aligning from that point downwards if we want perfect alignment.
                  However, time labels usually start from the very top of their axis. The artist blocks inside stages are positioned relative to 
                  the full height. Let's keep it simple for now, time labels start from top of their column.
              */}
              {TIME_LABELS.map((label, index) => (
                <div
                  key={label}
                  className="absolute text-xs text-slate-500 text-right pr-2 w-full"
                  style={{ 
                    top: `${index * 60 * TIME_SLOT_HEIGHT_PER_MINUTE - 8}px`, // -8 to center text vertically against the line
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Stages Area (Horizontally scrollable content) */}
          {/* StageColumns are laid out via flex in this parent. The main 'overflow-auto' handles their horizontal scrolling. */}
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
  );
};

export default TimetableView;
