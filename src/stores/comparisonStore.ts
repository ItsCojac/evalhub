import { create } from 'zustand';
import type { Service } from '../lib/types';

interface ComparisonState {
  selectedServices: Service[];
  addService: (service: Service) => void;
  removeService: (serviceId: string) => void;
  clearComparison: () => void;
}

export const useComparisonStore = create<ComparisonState>((set) => ({
  selectedServices: [],
  addService: (service) =>
    set((state) => ({
      selectedServices: state.selectedServices.length < 3
        ? [...state.selectedServices, service]
        : state.selectedServices,
    })),
  removeService: (serviceId) =>
    set((state) => ({
      selectedServices: state.selectedServices.filter((s) => s.id !== serviceId),
    })),
  clearComparison: () => set({ selectedServices: [] }),
}));