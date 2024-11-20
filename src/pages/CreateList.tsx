import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Header } from '../components/Header';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { listSchema, type ListFormData } from '../lib/schemas';

export const CreateList: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ListFormData>({
    resolver: zodResolver(listSchema),
  });
  
  const onSubmit = async (data: ListFormData) => {
    try {
      // Here you would typically make an API call to create the list
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success('List created successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create list. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New List</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                List Title
              </label>
              <input
                {...register('title')}
                type="text"
                id="title"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., Cloud Storage Solutions"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Describe what this list is about..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">
                Categories
              </label>
              <input
                {...register('categories')}
                type="text"
                id="categories"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Add categories separated by commas"
              />
              {errors.categories && (
                <p className="mt-1 text-sm text-red-600">{errors.categories.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                These will be used to organize services within your list
              </p>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoadingSpinner className="mr-2" />
                    Creating...
                  </>
                ) : (
                  'Create List'
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};