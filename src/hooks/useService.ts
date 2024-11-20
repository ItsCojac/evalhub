import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Service } from '../lib/types';
import { getServices, createService, upsertVote } from '../lib/api';
import { useListSubscription } from './useRealtime';

export function useServices(listId: string) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (listId) {
      fetchServices();
    }
  }, [listId]);

  useListSubscription(listId, () => {
    fetchServices();
  });

  async function fetchServices() {
    try {
      const data = await getServices(listId);
      setServices(data);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  }

  async function addService(service: Partial<Service>) {
    try {
      const newService = await createService({ ...service, list_id: listId });
      setServices((prev) => [newService, ...prev]);
      toast.success('Service added successfully');
      return newService;
    } catch (err) {
      toast.error('Failed to add service');
      throw err;
    }
  }

  async function vote(serviceId: string, value: 1 | -1, userId: string) {
    try {
      await upsertVote({
        service_id: serviceId,
        user_id: userId,
        value,
      });
      toast.success('Vote recorded');
    } catch (err) {
      toast.error('Failed to record vote');
      throw err;
    }
  }

  return {
    services,
    loading,
    error,
    addService,
    vote,
    refreshServices: fetchServices,
  };
}