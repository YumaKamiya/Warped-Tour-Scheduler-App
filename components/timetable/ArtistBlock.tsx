
import React from 'react';
import { Artist, WantLevel } from '../../types';
import { TIME_SLOTS_START_HOUR, TIME_SLOT_HEIGHT_PER_MINUTE } from '../../constants';
import StarIcon from '../icons/StarIcon';
import EyeIcon from '../icons/EyeIcon';
import PencilIcon from '../icons/PencilIcon';

interface ArtistBlockProps {
  artist: Artist;
  onSelectArtist: (artist: Artist) => void;
}

const timeToMinutes = (timeStr: string): number => {
  if (!timeStr || !timeStr.includes(':')) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const getWantLevelBorderColor = (level: WantLevel): string => {
  switch (level) {
    case 5: return 'border-blue-500';
    case 4: return 'border-sky-500';
    case 3: return 'border-teal-500';
    case 2: return 'border-slate-400';
    case 1: return 'border-slate-300';
    default: return 'border-slate-300';
  }
};


const ArtistBlock: React.FC<ArtistBlockProps> = ({ artist, onSelectArtist }) => {
  if (!artist.startTime || !artist.endTime) return null;

  const startTimeInMinutes = timeToMinutes(artist.startTime);
  const endTimeInMinutes = timeToMinutes(artist.endTime);
  const timetableStartOffsetMinutes = TIME_SLOTS_START_HOUR * 60;

  const topPosition = (startTimeInMinutes - timetableStartOffsetMinutes) * TIME_SLOT_HEIGHT_PER_MINUTE;
  const height = (endTimeInMinutes - startTimeInMinutes) * TIME_SLOT_HEIGHT_PER_MINUTE;

  if (height <= 0) return null; // Invalid time range

  const isShortBlock = height < 50; // Approx < 25 mins * 2px/min. Adjusted threshold due to increased height per minute.

  return (
    <div
      style={{
        top: `${topPosition}px`,
        height: `${height}px`,
      }}
      className={`absolute left-[2px] right-[2px] p-1.5 sm:p-2 rounded-md shadow-sm hover:shadow-md text-slate-700 cursor-pointer hover:ring-2 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ease-in-out overflow-hidden border-l-4 bg-white ${getWantLevelBorderColor(artist.wantLevel)}`}
      onClick={() => onSelectArtist(artist)}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onSelectArtist(artist)}
      title={`Edit ${artist.name}`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <p className={`font-semibold ${isShortBlock ? 'text-xs truncate' : 'text-sm'}`}>{artist.name}</p>
          {!isShortBlock && (
            <p className="text-xs text-slate-500">
              {artist.startTime} - {artist.endTime}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-1.5 mt-auto pt-1">
          <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
          <span className="text-xs text-slate-600">{artist.wantLevel}</span>
          {artist.watch && <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />}
          {/* PencilIcon is part of a "group" concept, but this block isn't explicitly a "group". We can make it one or style directly. */}
          <PencilIcon className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 ml-auto opacity-60 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default ArtistBlock;