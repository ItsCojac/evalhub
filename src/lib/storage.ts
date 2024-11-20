import { supabase } from './supabase';
import { toast } from 'sonner';

export async function uploadServiceLogo(file: File, serviceId: string): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${serviceId}-${Date.now()}.${fileExt}`;
    const filePath = `service-logos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('service-assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('service-assets')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading logo:', error);
    toast.error('Failed to upload logo');
    throw error;
  }
}