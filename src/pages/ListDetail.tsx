import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/ui/Button';
import { Plus, ThumbsUp, MessageSquare, Share2, Scale, ArrowLeft } from 'lucide-react';
import { ServiceCard } from '../components/ServiceCard';
import { AddServiceModal } from '../components/AddServiceModal';
import { ComparisonModal } from '../components/ComparisonModal';
import { useComparisonStore } from '../stores/comparisonStore';
import { useServices } from '../hooks/useService';
import { getList } from '../lib/api';
import { List } from '../lib/types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { toast } from 'sonner';

export const ListDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [list, setList] = useState<List | null>(null);
  const [loading, setLoading] = useState(true);
  const { services, addService, loading: servicesLoading } = useServices(id!);
  const selectedServices = useComparisonStore((state) => state.selectedServices);

  useEffect(() => {
    if (id) {
      fetchList();
    }
  }, [id]);

  const fetchList = async () => {
    try {
      const data = await getList(id!);
      setList(data);
    } catch (error) {
      toast.error('Failed to load list details');
      console.error('Error fetching list:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || servicesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (!list) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">List not found</h2>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>

        <div className="bg-white shadow-md rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{list.title}</h2>
                <p className="mt-1 text-sm text-gray-500">{list.description}</p>
                {list.categories && list.categories.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {list.categories.map((category, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add Service
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <ThumbsUp className="h-5 w-5" />
                  <span>{services.reduce((acc, service) => acc + (service.votes?.length || 0), 0)} votes</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <MessageSquare className="h-5 w-5" />
                  <span>{services.reduce((acc, service) => acc + (service.comments?.length || 0), 0)} comments</span>
                </button>
              </div>

              {selectedServices.length > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setIsCompareModalOpen(true)}
                >
                  <Scale className="h-4 w-4" />
                  Compare ({selectedServices.length})
                </Button>
              )}
            </div>

            {services.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services added yet</h3>
                <p className="text-gray-500 mb-4">Start by adding a service to this list</p>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex items-center gap-2 mx-auto"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add First Service
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onCompareClick={() => setIsCompareModalOpen(true)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={addService}
      />

      <ComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
      />
    </div>
  );
};