import { useEffect } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { subscribeToList, subscribeToService } from '../lib/api';

export function useListSubscription(listId: string, onUpdate: (payload: any) => void) {
  useEffect(() => {
    let channel: RealtimeChannel;

    if (listId) {
      channel = subscribeToList(listId, (payload) => {
        onUpdate(payload);
      });
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [listId, onUpdate]);
}

export function useServiceSubscription(serviceId: string, onUpdate: (payload: any) => void) {
  useEffect(() => {
    let channel: RealtimeChannel;

    if (serviceId) {
      channel = subscribeToService(serviceId, (payload) => {
        onUpdate(payload);
      });
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [serviceId, onUpdate]);
}