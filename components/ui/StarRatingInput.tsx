
import React, { useState } from 'react';
import StarIcon from '../icons/StarIcon';
import StarOutlineIcon from '../icons/StarOutlineIcon';
import { WantLevel } from '../../types';
import { WANT_LEVELS } from '../../constants';


interface StarRatingInputProps {
  value: WantLevel | 0; // 0 for unselected
  onChange: (value: WantLevel) => void;
  className?: string;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({ value, onChange, className }) => {
  const [hoverRating, setHoverRating] = useState<WantLevel | 0>(0);

  return (
    <div className={`flex space-x-1 ${className}`}>
      {WANT_LEVELS.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="text-amber-400 hover:text-amber-500 transition-colors focus:outline-none"
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          {(hoverRating || value) >= star ? (
            <StarIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          ) : (
            <StarOutlineIcon className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400 hover:text-amber-400" />
          )}
        </button>
      ))}
    </div>
  );
};

export default StarRatingInput;