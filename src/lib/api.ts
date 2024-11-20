import { supabase } from './supabase';
import type { List, Service, Vote, Comment, Collaborator } from './types';

// Lists
export async function getLists() {
  const { data, error } = await supabase
    .from('lists')
    .select(`
      *,
      collaborators (count),
      services (count),
      votes:services(votes(count))
    `)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data as List[];
}

export async function getList(id: string) {
  const { data, error } = await supabase
    .from('lists')
    .select(`
      *,
      collaborators (
        user_id,
        role,
        profiles (
          full_name,
          avatar_url
        )
      ),
      services (
        *,
        votes (count),
        comments (count)
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as List & { services: Service[] };
}

export async function createList(list: Partial<List>) {
  const { data, error } = await supabase
    .from('lists')
    .insert(list)
    .select()
    .single();

  if (error) throw error;
  return data as List;
}

export async function updateList(id: string, updates: Partial<List>) {
  const { data, error } = await supabase
    .from('lists')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as List;
}

export async function deleteList(id: string) {
  const { error } = await supabase
    .from('lists')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Services
export async function getServices(listId: string) {
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      votes (
        id,
        user_id,
        value
      ),
      comments (
        id,
        user_id,
        content,
        created_at,
        updated_at,
        profiles (
          full_name,
          avatar_url
        )
      )
    `)
    .eq('list_id', listId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Service[];
}

export async function createService(service: Partial<Service>) {
  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select()
    .single();

  if (error) throw error;
  return data as Service;
}

export async function updateService(id: string, updates: Partial<Service>) {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Service;
}

export async function deleteService(id: string) {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Comments
export async function getComments(serviceId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
    .eq('service_id', serviceId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as Comment[];
}

export async function createComment(comment: {
  service_id: string;
  content: string;
  user_id: string;
}) {
  const { data, error } = await supabase
    .from('comments')
    .insert(comment)
    .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
    .single();

  if (error) throw error;
  return data as Comment;
}

export async function updateComment(id: string, content: string) {
  const { data, error } = await supabase
    .from('comments')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
    .single();

  if (error) throw error;
  return data as Comment;
}

export async function deleteComment(id: string) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Votes
export async function upsertVote(vote: {
  service_id: string;
  user_id: string;
  value: 1 | -1;
}) {
  const { data, error } = await supabase
    .from('votes')
    .upsert(vote, { onConflict: 'service_id,user_id' })
    .select()
    .single();

  if (error) throw error;
  return data as Vote;
}

// Search
export async function searchLists(query: string) {
  const { data, error } = await supabase
    .from('lists')
    .select(`
      *,
      collaborators (count),
      services (count),
      votes:services(votes(count))
    `)
    .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data as List[];
}

// Collaborators
export async function getCollaborators(listId: string) {
  const { data, error } = await supabase
    .from('collaborators')
    .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
    .eq('list_id', listId);

  if (error) throw error;
  return data as Collaborator[];
}

export async function addCollaborator(collaborator: {
  list_id: string;
  email: string;
  role: 'editor' | 'viewer';
}) {
  const { data: userData, error: userError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', collaborator.email)
    .single();

  if (userError) throw userError;

  const { data, error } = await supabase
    .from('collaborators')
    .insert({
      list_id: collaborator.list_id,
      user_id: userData.id,
      role: collaborator.role,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Collaborator;
}

export async function updateCollaboratorRole(
  listId: string,
  userId: string,
  role: 'editor' | 'viewer'
) {
  const { data, error } = await supabase
    .from('collaborators')
    .update({ role })
    .match({ list_id: listId, user_id: userId })
    .select()
    .single();

  if (error) throw error;
  return data as Collaborator;
}

export async function removeCollaborator(listId: string, userId: string) {
  const { error } = await supabase
    .from('collaborators')
    .delete()
    .match({ list_id: listId, user_id: userId });

  if (error) throw error;
}

// Ensure these functions are defined and exported
export const subscribeToList = () => {
    // function implementation
};

export const subscribeToService = () => {
    // function implementation
};