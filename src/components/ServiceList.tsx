import React from 'react';
import { MoreHorizontal, Star, ThumbsUp, Users } from 'lucide-react';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';
import { List } from '../lib/types';
import { formatDistanceToNow } from 'date-fns';

interface ServiceListProps {
  lists: List[];
}

export const ServiceList: React.FC<ServiceListProps> = ({ lists }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lists.map((list) => (
        <div
          key={list.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {list.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {list.description}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>{list._count?.services || 0} services</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{list._count?.votes || 0} votes</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{list._count?.collaborators || 0}</span>
              </div>
            </div>

            {list.categories && list.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
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

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                Updated {formatDistanceToNow(new Date(list.updated_at), { addSuffix: true })}
              </span>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t">
            <Button 
              variant="ghost" 
              className="text-blue-600 hover:text-blue-700 w-full"
              onClick={() => navigate(`/lists/${list.id}`)}
            >
              View List
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};