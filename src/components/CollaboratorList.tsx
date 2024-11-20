import React from 'react';
import { UserPlus, Trash2, Crown } from 'lucide-react';
import { Button } from './ui/Button';
import { useAuth } from '../contexts/AuthContext';
import type { Collaborator } from '../lib/types';

interface CollaboratorListProps {
  collaborators: Collaborator[];
  onInvite: () => void;
  onRemove: (userId: string) => void;
  isOwner: boolean;
}

export const CollaboratorList: React.FC<CollaboratorListProps> = ({
  collaborators,
  onInvite,
  onRemove,
  isOwner,
}) => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Collaborators</h3>
        {isOwner && (
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
            onClick={onInvite}
          >
            <UserPlus className="h-4 w-4" />
            Invite
          </Button>
        )}
      </div>
      
      <ul className="divide-y divide-gray-200">
        {collaborators.map((collaborator) => (
          <li key={collaborator.user_id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {collaborator.user_id[0].toUpperCase()}
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900">
                      {collaborator.user_id}
                    </p>
                    {collaborator.role === 'owner' && (
                      <Crown className="h-4 w-4 ml-2 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 capitalize">
                    {collaborator.role}
                  </p>
                </div>
              </div>
              
              {isOwner && collaborator.user_id !== user?.id && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => onRemove(collaborator.user_id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};