import { supabase } from '@/lib/supabaseClient'

export const getComments = async ({ postId }) => {
  //Handle get all comments
  const { data, error, status } = await supabase
  .from('comments')
  .select()
  .eq('post_id', postId)

  if (error) {
    console.log(error, status)
  }

  console.log({data})  
  return { data, error, status };
};

export const addComment = async (_, {arg: {comment, author}}) => {
  //Handle add comment here
  const { data, error, status } = await supabase
  .from('comments')
  .insert({comment, author})
  .select()
  .single()

  if (error) {
    console.log(error, status)
  }

  console.log({data})  
  return { data, error, status };
};

export const removeComment = async (_, {arg: {comment, author}}) => {
  //Handle remove comment here
  const { data, error, status } = await supabase
.from('posts')
.update({arg: {comment, author}})
.eq('id', id)
.select()
.single()

console.log({data}) 

return { data, error, status}
};
