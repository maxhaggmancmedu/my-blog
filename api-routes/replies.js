import { supabase } from '@/lib/supabaseClient'

export const getReplies = async ({ commentId }) => {
    //Handle get all comments
    const { data, error, status } = await supabase
    .from('replies')
    .select()
    .eq('comment_id', commentId)
  
    if (error) {
      console.log(error, status)
    }
   
    return { data };
  };

export const addReply = async (_, {arg: {reply, author, comment_id, user_id}}) => {
    //Handle add comment here
    console.log({reply, author})
    const { data, error, status } = await supabase
    .from('replies')
    .insert({reply, author, comment_id, user_id})
    .select()
    .single()
  
    if (error) {
      console.log(error, status)
    }
   
    return { data, error, status };
};

export const removeReply = async (_, {arg: { id }}) => {
  //Handle remove comment here
  console.log(id)
  const { data, error, status } = await supabase
  .from('replies')
  .delete()
  .eq('id', id)

return { data, error, status}
};