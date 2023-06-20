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
 
  return { data };
};

export const addComment = async (_, {arg: {comment, author, post_id, user_id}}) => {
  //Handle add comment here
  const { data, error, status } = await supabase
  .from('comments')
  .insert({comment, author, post_id, user_id})
  .select()
  .single()

  if (error) {
    console.log(error, status)
  }
 
  return { data, error, status };
};

export const removeComment = async (_, {arg: { id }}) => {
  //Handle remove comment here
  console.log(id)
const { data, error, status } = await supabase
.from('comments')
.delete()
.eq('id', id)

console.log({error ,status})

return { data, error, status}
};
