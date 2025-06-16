
import React, { useState, useEffect, useCallback } from 'react';
import { Artist, Day, StageId, WantLevel } from '../types';
import { DAYS, STAGES, WANT_LEVELS } from '../constants';
import Modal from './ui/Modal';
import Button from './ui/Button';
import StarRatingInput from './ui/StarRatingInput';
import EyeIcon from './icons/EyeIcon';
import EyeSlashIcon from './icons/EyeSlashIcon';

interface ArtistDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (artist: Artist) => Promise<void>;
  artistToEdit: Artist | null;
}

interface ArtistFormData {
  name: string;
  wantLevel: WantLevel | 0; // 0 for unselected in form
  watch: boolean;
  memo: string;
  day: Day | null;
  stage: StageId | null;
  startTime: string;
  endTime: string;
}

const initialModalFormState: ArtistFormData = {
  name: '',
  wantLevel: 0, // Default to 0 (unselected)
  watch: false,
  memo: '',
  day: null,
  stage: null,
  startTime: '',
  endTime: '',
};

const ArtistDetailModal: React.FC<ArtistDetailModalProps> = ({
  isOpen,
  onClose,
  onSave,
  artistToEdit,
}) => {
  const [formData, setFormData] = useState<ArtistFormData>(initialModalFormState);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (artistToEdit) {
      setFormData({
        name: artistToEdit.name,
        wantLevel: artistToEdit.wantLevel,
        watch: artistToEdit.watch,
        memo: artistToEdit.memo,
        day: artistToEdit.day,
        stage: artistToEdit.stage,
        startTime: artistToEdit.startTime,
        endTime: artistToEdit.endTime,
      });
    } else {
      setFormData(initialModalFormState);
    }
    setValidationError(null);
  }, [artistToEdit, isOpen]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "stage") {
        setFormData((prev) => ({ ...prev, [name]: value ? parseInt(value) as StageId : null }));
    }
    else {
        setFormData((prev) => ({ ...prev, [name]: value === "" && (name === "day" || name === "stage") ? null : value }));
    }
  }, []);

  const handleWantLevelChange = useCallback((level: WantLevel) => {
    setFormData((prev) => ({ ...prev, wantLevel: level }));
    if (validationError && level > 0) {
      setValidationError(null);
    }
  }, [validationError]);

  const handleSave = async () => {
    if (formData.wantLevel === 0) {
      setValidationError('"Want to See" level is required.');
      return;
    }
    if (!WANT_LEVELS.includes(formData.wantLevel)) {
      setValidationError('Invalid "Want to See" level. Please select 1-5 stars.');
      return;
    }

    setValidationError(null);
    setIsSaving(true);
    const artistData: Artist = {
      name: formData.name,
      watch: formData.watch,
      memo: formData.memo,
      day: formData.day,
      stage: formData.stage,
      startTime: formData.startTime,
      endTime: formData.endTime,
      id: artistToEdit ? artistToEdit.id : crypto.randomUUID(),
      wantLevel: formData.wantLevel,
    };
    try {
      await onSave(artistData);
      onClose(); 
    } catch (error) {
      console.error("Save failed in modal:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const renderLabel = (text: string, htmlFor?: string) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-600 mb-1">
      {text}
    </label>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={artistToEdit ? 'Edit Artist' : 'Add New Artist'}
      footer={
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} isLoading={isSaving} disabled={isSaving || !formData.name.trim()}>
            {isSaving ? 'Saving...' : 'Save Artist'}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          {renderLabel('Artist Name', 'name')}
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white border-slate-300 text-slate-800 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400"
            placeholder="e.g., My Chemical Romance"
          />
        </div>

        <div>
            <div className="flex justify-between items-center">
                {renderLabel('Want to See ★')}
                {validationError && <p className="text-xs text-red-500">{validationError}</p>}
            </div>
          <StarRatingInput value={formData.wantLevel} onChange={handleWantLevelChange} />
        </div>

        <div>
          {renderLabel('Memo', 'memo')}
          <textarea
            name="memo"
            id="memo"
            value={formData.memo}
            onChange={handleChange}
            rows={3}
            className="w-full bg-white border-slate-300 text-slate-800 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400"
            placeholder="Notes, reminders, e.g., 'Play their old hits!'"
          />
        </div>
        
        <div className="flex items-center space-x-3">
            {renderLabel('Watch Flag', 'watch')}
            <button
                type="button"
                name="watch"
                id="watch"
                onClick={() => setFormData(prev => ({...prev, watch: !prev.watch}))}
                className={`p-2 rounded-full transition-colors ${formData.watch ? 'bg-blue-500 hover:bg-blue-600' : 'bg-slate-200 hover:bg-slate-300'}`}
                aria-pressed={formData.watch}
            >
                {formData.watch ? <EyeIcon className="w-5 h-5 text-white" /> : <EyeSlashIcon className="w-5 h-5 text-slate-500" />}
            </button>
            <span className="text-sm text-slate-600">{formData.watch ? 'Watching' : 'Not Watching'}</span>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            {renderLabel('Day', 'day')}
            <select
              name="day"
              id="day"
              value={formData.day || ''}
              onChange={handleChange}
              className="w-full bg-white border-slate-300 text-slate-800 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Not Set</option>
              {DAYS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            {renderLabel('Stage', 'stage')}
            <select
              name="stage"
              id="stage"
              value={formData.stage || ''}
              onChange={handleChange}
              className="w-full bg-white border-slate-300 text-slate-800 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Not Set</option>
              {STAGES.map((s) => (
                <option key={s} value={s}>Stage {s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            {renderLabel('Start Time', 'startTime')}
            <input
              type="time"
              name="startTime"
              id="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full bg-white border-slate-300 text-slate-800 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            />
          </div>
          <div>
            {renderLabel('End Time', 'endTime')}
            <input
              type="time"
              name="endTime"
              id="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full bg-white border-slate-300 text-slate-800 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ArtistDetailModal;