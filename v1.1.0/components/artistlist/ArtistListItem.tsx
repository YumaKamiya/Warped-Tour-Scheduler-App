
import React from 'react';
import { Artist } from '../../types';
import StarIcon from '../icons/StarIcon';
import EyeIcon from '../icons/EyeIcon';
import PencilIcon from '../icons/PencilIcon';
import EyeSlashIcon from '../icons/EyeSlashIcon';

interface ArtistListItemProps {
  artist: Artist;
  onSelectArtist: (artist: Artist) => void;
}

const ArtistListItem: React.FC<ArtistListItemProps> = ({ artist, onSelectArtist }) => {
  return (
    <li
      className="bg-white p-4 rounded-lg shadow-sm hover:bg-slate-50 transition-colors duration-150 cursor-pointer group"
      onClick={() => onSelectArtist(artist)}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onSelectArtist(artist)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-blue-600 group-hover:text-blue-500">{artist.name}</h3>
        <button 
          className="text-slate-400 hover:text-blue-500 p-1 -mr-1"
          aria-label={`Edit ${artist.name}`}
          onClick={(e) => { e.stopPropagation(); onSelectArtist(artist);}}
        >
          <PencilIcon className="w-5 h-5"/>
        </button>
      </div>
      <div className="mt-2 flex items-center space-x-4 text-sm text-slate-500">
        <div className="flex items-center">
          <StarIcon className="w-4 h-4 text-amber-400 mr-1" />
          <span>{artist.wantLevel}/5</span>
        </div>
        <div className="flex items-center">
          {artist.watch ? <EyeIcon className="w-4 h-4 text-emerald-500 mr-1" /> : <EyeSlashIcon className="w-4 h-4 text-slate-400 mr-1" />}
          <span>{artist.watch ? 'Watching' : 'Not Watching'}</span>
        </div>
        {artist.day && <span className="capitalize">{artist.day}</span>}
      </div>
      {artist.memo && <p className="mt-2 text-xs text-slate-400 italic truncate">{artist.memo}</p>}
    </li>
  );
};

export default ArtistListItem;