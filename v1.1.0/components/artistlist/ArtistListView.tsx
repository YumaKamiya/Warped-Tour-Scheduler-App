
import React, { useState, useMemo, useCallback } from 'react';
import { Artist, WantLevel } from '../../types';
import { WANT_LEVELS } from '../../constants';
import ArtistListItem from './ArtistListItem';
import Button from '../ui/Button';
import PlusIcon from '../icons/PlusIcon';
import StarIcon from '../icons/StarIcon';
import EyeIcon from '../icons/EyeIcon';
import EyeSlashIcon from '../icons/EyeSlashIcon';


interface ArtistListViewProps {
  artists: Artist[];
  onSelectArtist: (artist: Artist) => void;
  onAddNewArtist: () => void;
}

type SortOrder = 'asc' | 'desc';

const ArtistListView: React.FC<ArtistListViewProps> = ({ artists, onSelectArtist, onAddNewArtist }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWantLevels, setSelectedWantLevels] = useState<WantLevel[]>([]);
  const [showOnlyWatching, setShowOnlyWatching] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const filteredAndSortedArtists = useMemo(() => {
    let result = artists.filter((artist) => {
      const nameMatch = artist.name.toLowerCase().includes(searchTerm.toLowerCase());
      const memoMatch = artist.memo.toLowerCase().includes(searchTerm.toLowerCase());
      const wantLevelMatch = selectedWantLevels.length === 0 || selectedWantLevels.includes(artist.wantLevel);
      const watchingMatch = !showOnlyWatching || artist.watch;
      return (nameMatch || memoMatch) && wantLevelMatch && watchingMatch;
    });

    result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.wantLevel - b.wantLevel || a.name.localeCompare(b.name);
      }
      return b.wantLevel - a.wantLevel || a.name.localeCompare(b.name);
    });

    return result;
  }, [artists, searchTerm, selectedWantLevels, showOnlyWatching, sortOrder]);

  const toggleWantLevelFilter = useCallback((level: WantLevel) => {
    setSelectedWantLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  return (
    <div className="p-4 space-y-4 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name or memo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-auto flex-grow bg-white border border-slate-300 text-slate-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400"
        />
        <Button onClick={onAddNewArtist} className="w-full sm:w-auto" size="md">
          <PlusIcon className="w-5 h-5 mr-2" /> Add New Artist
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-slate-100 p-3 rounded-lg shadow-sm">
        <div className="text-sm font-medium text-slate-600 mb-2">Filters:</div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Want Level Filter */}
            <div className="flex items-center space-x-1">
                <span className="text-xs text-slate-500 mr-1">Want:</span>
                {WANT_LEVELS.map(level => (
                <button
                    key={level}
                    onClick={() => toggleWantLevelFilter(level)}
                    className={`p-1.5 rounded-full transition-colors ${selectedWantLevels.includes(level) ? 'bg-amber-500' : 'bg-slate-200 hover:bg-slate-300'}`}
                    title={`Filter by ${level} star${level > 1 ? 's' : ''}`}
                    aria-pressed={selectedWantLevels.includes(level)}
                >
                    <StarIcon className={`w-4 h-4 ${selectedWantLevels.includes(level) ? 'text-white' : 'text-amber-400'}`} />
                </button>
                ))}
            </div>
            
            {/* Watch Flag Filter */}
            <button
                onClick={() => setShowOnlyWatching(!showOnlyWatching)}
                className={`flex items-center space-x-1 p-1.5 rounded-md text-xs transition-colors ${showOnlyWatching ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
                title="Filter by watch status"
                aria-pressed={showOnlyWatching}
            >
                {showOnlyWatching ? <EyeIcon className="w-4 h-4"/> : <EyeSlashIcon className="w-4 h-4"/>}
                <span>{showOnlyWatching ? 'Watching Only' : 'Show All'}</span>
            </button>

            {/* Sort Order Toggle */}
            <button
                onClick={toggleSortOrder}
                className="flex items-center space-x-1 p-1.5 rounded-md text-xs bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors"
                title={`Sort by Want Level (${sortOrder === 'asc' ? 'Ascending' : 'Descending'})`}
            >
                <StarIcon className="w-4 h-4 text-amber-400"/>
                <span>Sort: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}</span>
            </button>
        </div>
      </div>

      {filteredAndSortedArtists.length > 0 ? (
        <ul className="space-y-3 overflow-y-auto flex-grow pb-4 scrollbar-thin"> {/* scrollbar-thumb-gray-700 scrollbar-track-gray-800 removed */}
          {filteredAndSortedArtists.map((artist) => (
            <ArtistListItem key={artist.id} artist={artist} onSelectArtist={onSelectArtist} />
          ))}
        </ul>
      ) : (
        <div className="text-center text-slate-500 py-10 flex-grow flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xl font-semibold">No artists found.</p>
          <p className="text-sm">Try adjusting your search or filters, or add a new artist!</p>
        </div>
      )}
    </div>
  );
};

export default ArtistListView;