import React from 'react';
import { X } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { useComparisonStore } from '../stores/comparisonStore';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose }) => {
  const { selectedServices, removeService, clearComparison } = useComparisonStore();

  const handleClose = () => {
    clearComparison();
    onClose();
  };

  const features = Array.from(
    new Set(selectedServices.flatMap((service) => service.features))
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Service Comparison"
      className="max-w-6xl"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feature
              </th>
              {selectedServices.map((service) => (
                <th
                  key={service.id}
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center justify-between">
                    <span>{service.name}</span>
                    <button
                      onClick={() => removeService(service.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Pricing
              </td>
              {selectedServices.map((service) => (
                <td
                  key={service.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {service.pricing}
                </td>
              ))}
            </tr>
            {features.map((feature) => (
              <tr key={feature}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {feature}
                </td>
                {selectedServices.map((service) => (
                  <td
                    key={service.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {service.features.includes(feature) ? '✓' : '✗'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleClose}>Close</Button>
      </div>
    </Modal>
  );
};