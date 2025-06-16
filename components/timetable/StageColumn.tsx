
import React from 'react';
import { Artist, StageId } from '../../types';
import ArtistBlock from './ArtistBlock';
import { TIME_SLOTS_START_HOUR, TIME_SLOTS_END_HOUR, TIME_SLOT_HEIGHT_PER_MINUTE } from '../../constants';


interface StageColumnProps {
  stageId: StageId;
  artists: Artist[];
  onSelectArtist: (artist: Artist) => void;
}

const StageColumn: React.FC<StageColumnProps> = ({ stageId, artists, onSelectArtist }) => {
  const stageArtists = artists.filter(
    (artist) => artist.stage === stageId && artist.startTime && artist.endTime
  );

  return (
    <div className="flex-shrink-0 w-40 sm:w-48 h-full border-r border-slate-200 relative bg-white">
      {/* Stage Name Header - Sticky */}
      <div className="sticky top-0 z-10 h-10 flex items-center justify-center border-b border-slate-200 bg-slate-50 shadow-sm">
        <h4 className="text-sm font-semibold text-blue-600">Stage {stageId}</h4>
      </div>
      
      {/* Content area for artist blocks and hour lines - relative positioning context */}
      <div className="relative h-full">
        {/* Hour lines for visual guidance */}
        {Array.from({ length: TIME_SLOTS_END_HOUR - TIME_SLOTS_START_HOUR }).map((_, i) => (
          <div
            key={`hour-line-${stageId}-${i}`}
            className="absolute left-0 right-0 border-t border-slate-200/75"
            // Position from the top of this inner div, which starts after the sticky header
            style={{ top: `${i * 60 * TIME_SLOT_HEIGHT_PER_MINUTE}px`, height: '1px' }} 
          ></div>
        ))}
        {stageArtists.map((artist) => (
          <ArtistBlock key={artist.id} artist={artist} onSelectArtist={onSelectArtist} />
        ))}
      </div>
    </div>
  );
};

export default StageColumn;