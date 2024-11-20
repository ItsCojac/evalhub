import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Collaborator } from '../lib/types';
import { getCollaborators, removeCollaborator } from '../lib/api';

export function useCollaborators(listId: string) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (listId) {
      fetchCollaborators();
    }
  }, [listId]);

  async function fetchCollaborators() {
    try {
      const data = await getCollaborators(listId);
      setCollaborators(data);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to fetch collaborators');
    } finally {
      setLoading(false);
    }
  }

  async function removeCollaboratorById(userId: string) {
    try {
      await removeCollaborator(listId, userId);
      setCollaborators((prev) =>
        prev.filter((collaborator) => collaborator.user_id !== userId)
      );
      toast.success('Collaborator removed successfully');
    } catch (err) {
      toast.error('Failed to remove collaborator');
      throw err;
    }
  }

  return {
    collaborators,
    loading,
    error,
    removeCollaborator: removeCollaboratorById,
    refreshCollaborators: fetchCollaborators,
  };
}