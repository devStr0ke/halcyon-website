import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { HalcyonProfile } from '../types/supabaseTypes';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/*export default createServerComponentSupabaseClient({
  headers,
  cookies
});*/

export async function createHalcyonProfile(
  id_discord: string,
  sui_adresse: string
): Promise<HalcyonProfile | null> {
  try {
    const ret = await supabase.auth.getUser();
    const userId = ret?.data.user?.id;
    if (userId === undefined) throw 'Impossible to get the userId';

    const { data, error } = await supabase.from('halcyon_profile').insert<HalcyonProfile>([
      {
        id: userId,
        id_discord: id_discord,
        sui_adresse: sui_adresse
      }
    ]);

    if (error) {
      throw error;
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error('Error inserting data:', error);
    return null;
  }
}

export async function updateIsWetlisted(userId: string, isWetlisted: boolean) {
  try {
    const { data, error } = await supabase
      .from('halcyon_profile')
      .update({ is_wetlisted: isWetlisted })
      .eq('id', userId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error updating wetlist:', error);
  }
}

export async function getIsWetlisted(userId: string): Promise<boolean | null> {
  try {
    const { data, error } = await supabase
      .from('halcyon_profile')
      .select('is_wetlisted')
      .eq('id', userId)
      .single();

    if (error) {
      // If the error is not 'Record not found', throw the error
      if (error.message !== 'Record not found') {
        throw error;
      }
      // If the error is 'Record not found', return null
      return null;
    }

    // If a row is found, return the value of the 'is_wetlisted' column
    return data?.is_wetlisted ?? null;
  } catch (error) {
    console.error('Error checking for wetlisted status:', error);
    return null;
  }
}

export async function doesRowExist(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('halcyon_profile')
      .select('id')
      .eq('id', userId)
      .single();

    if (error) {
      // If the error is not 'Record not found', throw the error
      if (error.message !== 'Record not found') {
        throw error;
      }
    }

    // If a row is found, return true; otherwise, return false
    return data ? true : false;
  } catch (error) {
    console.error('Error checking for row existence:', error);
    return false;
  }
}
