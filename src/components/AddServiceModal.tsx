import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { LoadingSpinner } from './LoadingSpinner';
import { serviceSchema, type ServiceFormData } from '../lib/schemas';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (service: ServiceFormData) => void;
  isLoading?: boolean;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmitHandler = async (data: ServiceFormData) => {
    try {
      await onSubmit(data);
      toast.success('Service added successfully');
      reset();
      onClose();
    } catch (error) {
      toast.error('Failed to add service. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Service">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Service Name
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description')}
            id="description"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="features" className="block text-sm font-medium text-gray-700">
            Features (one per line)
          </label>
          <textarea
            {...register('features')}
            id="features"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.features && (
            <p className="mt-1 text-sm text-red-600">{errors.features.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="pricing" className="block text-sm font-medium text-gray-700">
            Pricing
          </label>
          <input
            {...register('pricing')}
            type="text"
            id="pricing"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.pricing && (
            <p className="mt-1 text-sm text-red-600">{errors.pricing.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
            Logo URL (optional)
          </label>
          <input
            {...register('logo')}
            type="url"
            id="logo"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.logo && (
            <p className="mt-1 text-sm text-red-600">{errors.logo.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
            Video URL (optional)
          </label>
          <input
            {...register('videoUrl')}
            type="url"
            id="videoUrl"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.videoUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.videoUrl.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner className="mr-2" />
                Adding...
              </>
            ) : (
              'Add Service'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};