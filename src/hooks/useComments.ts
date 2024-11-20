import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Comment } from '../lib/types';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export function useComments(serviceId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (serviceId) {
      fetchComments();
    }
  }, [serviceId]);

  async function fetchComments() {
    try {
      const data = await getComments(serviceId);
      setComments(data);
    } catch (error) {
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  }

  async function addComment(content: string) {
    if (!user) {
      toast.error('You must be logged in to comment');
      return;
    }

    try {
      const newComment = await createComment({
        service_id: serviceId,
        content,
        user_id: user.id,
      });
      setComments((prev) => [...prev, newComment]);
      toast.success('Comment added');
    } catch (error) {
      toast.error('Failed to add comment');
      throw error;
    }
  }

  async function editComment(id: string, content: string) {
    try {
      const updatedComment = await updateComment(id, content);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === id ? updatedComment : comment
        )
      );
      toast.success('Comment updated');
    } catch (error) {
      toast.error('Failed to update comment');
      throw error;
    }
  }

  async function removeComment(id: string) {
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((comment) => comment.id !== id));
      toast.success('Comment deleted');
    } catch (error) {
      toast.error('Failed to delete comment');
      throw error;
    }
  }

  return {
    comments,
    loading,
    addComment,
    editComment,
    removeComment,
    refreshComments: fetchComments,
  };
}