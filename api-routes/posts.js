import { supabase } from '@/lib/supabaseClient'

export const getPosts = async () => {
  const { data, error, status } = await supabase
  .from('posts')
  .select()

  if (error) {
    console.log(error, status)
  }

  console.log({data})  
  return { data, error, status };
};

export const getPost = async ({ slug }) => {
  const { data, error, status } = await supabase
  .from('posts')
  .select()
  .single()
  .eq('slug', slug)

  if (error) {
    console.log(error, status)
  }

  console.log({data})  
  return { data, error, status };
};

export const addPost = async (_, {arg: {title, slug, body}}) => {
  
  const { data, error, status } = await supabase
  .from('posts')
  .insert({title, slug, body})
  .select()
  .single()

  if (error) {
    console.log(error, status)
  }

  console.log({data})  
  return { data, error, status };
};

export const removePost = async (_, {arg: id }) => {
  const { data, error, status } = await supabase
  .from('posts')
  .delete()
  .eq('id', id)

  if (error) {
    console.log(error, status)
  }

  console.log({data})  
  return { data, error, status };
};

export const editPost = async (_, {arg: {title, body, image, slug} }) => {
const { data, error, status } = await supabase
.from('posts')
.update({title, body, image})
.eq('slug', slug)
.select()

return { data, error, status}

};
