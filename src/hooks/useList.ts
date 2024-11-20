import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { List } from '../lib/types';
import { getLists, createList, updateList } from '../lib/api';

export function useLists() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchLists();
  }, []);

  async function fetchLists() {
    try {
      const data = await getLists();
      setLists(data);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to fetch lists');
    } finally {
      setLoading(false);
    }
  }

  async function addList(list: Partial<List>) {
    try {
      const newList = await createList(list);
      setLists((prev) => [newList, ...prev]);
      toast.success('List created successfully');
      return newList;
    } catch (err) {
      toast.error('Failed to create list');
      throw err;
    }
  }

  async function editList(id: string, updates: Partial<List>) {
    try {
      const updatedList = await updateList(id, updates);
      setLists((prev) =>
        prev.map((list) => (list.id === id ? updatedList : list))
      );
      toast.success('List updated successfully');
      return updatedList;
    } catch (err) {
      toast.error('Failed to update list');
      throw err;
    }
  }

  return {
    lists,
    loading,
    error,
    addList,
    editList,
    refreshLists: fetchLists,
  };
}