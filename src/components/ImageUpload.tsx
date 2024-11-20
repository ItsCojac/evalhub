import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from './ui/Button';
import { uploadServiceLogo } from '../lib/storage';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onError?: (error: Error) => void;
  serviceId: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onError,
  serviceId,
}) => {
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadServiceLogo(file, serviceId);
      onChange(url);
    } catch (error) {
      onError?.(error as Error);
    }
  }, [serviceId, onChange, onError]);

  const handleRemove = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <div className="flex items-center space-x-4">
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Service logo"
            className="w-16 h-16 object-contain rounded-lg border border-gray-200"
          />
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button
            type="button"
            variant="secondary"
            className="flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Logo</span>
          </Button>
        </div>
      )}
    </div>
  );
};