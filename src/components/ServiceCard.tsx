import React from 'react';
import { ExternalLink, ThumbsUp, MessageSquare, Scale } from 'lucide-react';
import { Button } from './ui/Button';
import { useComparisonStore } from '../stores/comparisonStore';
import { toast } from 'sonner';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    features: string[];
    pricing: string;
    logo?: string;
    videoUrl?: string;
    votes: number;
    comments: number;
  };
  onCompareClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onCompareClick }) => {
  const { selectedServices, addService, removeService } = useComparisonStore();
  const isSelected = selectedServices.some((s) => s.id === service.id);

  const handleCompareClick = () => {
    if (isSelected) {
      removeService(service.id);
      return;
    }

    if (selectedServices.length >= 3) {
      toast.error('You can only compare up to 3 services at a time');
      return;
    }

    addService(service);
    if (onCompareClick) {
      onCompareClick();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            {service.logo ? (
              <img
                src={service.logo}
                alt={`${service.name} logo`}
                className="w-12 h-12 object-contain"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-xl font-medium">
                  {service.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.pricing}</p>
            </div>
          </div>
          
          {service.videoUrl && (
            <a
              href={service.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>

        <p className="text-gray-600 mb-4">{service.description}</p>

        <div className="space-y-2 mb-4">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
              {feature}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              <span>{service.votes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>{service.comments}</span>
            </Button>
          </div>
          
          <Button
            variant={isSelected ? 'primary' : 'secondary'}
            size="sm"
            onClick={handleCompareClick}
            className="flex items-center gap-2"
          >
            <Scale className="h-4 w-4" />
            {isSelected ? 'Remove' : 'Compare'}
          </Button>
        </div>
      </div>
    </div>
  );
};