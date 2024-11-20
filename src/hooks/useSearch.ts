import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { List } from '../lib/types';
import { searchLists } from '../lib/api';
import { useDebounce } from './useDebounce';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await searchLists(searchQuery);
      setResults(data);
    } catch (error) {
      toast.error('Failed to search lists');
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    debouncedSearch(searchQuery);
  }, [debouncedSearch]);

  return {
    query,
    results,
    loading,
    handleSearch,
  };
}