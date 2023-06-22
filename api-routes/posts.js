import { supabase } from '@/lib/supabaseClient'
import { uploadImage } from '../utils/uploadImage';

export const getPosts = async () => {
  const { data, error, status } = await supabase
  .from('posts')
  .select()

  return { data, error, status };
};

export const getPost = async ({ slug }) => {
  const { data, error, status } = await supabase
  .from('posts')
  .select()
  .single()
  .eq('slug', slug)

  return { data, error, status };
};

export const addPost = async (_, {arg: newPost}) => {

  let image = ''

  if (newPost?.image) {
    const {publicUrl, error} = await uploadImage(newPost?.image)

    if (!error) {
      image = publicUrl
    }
  }
  
  const { data, error, status } = await supabase
  .from('posts')
  .insert({...newPost, image})
  .select()
  .single()

  return { data, error, status };
};

export const removePost = async (_, {arg: id }) => {
  const { data, error, status } = await supabase
  .from('posts')
  .delete()
  .eq('id', id)

  return { data, error, status };
};

export const editPost = async (_, {arg: updatedPost }) => {

  let image = updatedPost?.image ?? '';

  const isNewImage = typeof image === 'object' && image !== null;

  if (isNewImage) {
    const {publicUrl, error} = await uploadImage(updatedPost?.image)

      if (!error) {
        image = publicUrl
      }
  }

  const { data, error, status } = await supabase
  .from('posts')
  .update({...updatedPost, image})
  .eq('id', updatedPost.id)
  .select()
  .single()


  return { data, error, status}

};

export const getFilteredPosts = async (_, {arg: searchQuery }) => {
  
const { data, error } = await supabase
  .from('posts')
  .select()
  .ilike('title', `%${searchQuery}%`)

  return { data, error };
};
