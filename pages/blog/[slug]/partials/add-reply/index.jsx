import React from 'react'
import Input from "@components/input";
import Textarea from "@components/text-area";
import Button from "@components/button";
import styles from './add-reply.module.css'
import { useRef } from 'react';
import { addReply } from '../../../../../api-routes/replies';
import { useUser } from '@supabase/auth-helpers-react';
import useSWRMutation from 'swr/mutation'
import { cacheKey } from '../replies';

export default function AddReply({ replyActive, setReplyActive, commentId, repliesOpen, setRepliesOpen }) {

    const formRef = useRef(); // create a reference
    const user = useUser()
    
    const { trigger: addTrigger, isMutating } = useSWRMutation(
      `${cacheKey}${commentId}`,
      addReply
    );
  
    const handleOnSubmit = async (event) => {
      event.preventDefault();

      
      // Alternative way to get the form data
      const formData = new FormData(event.target);
  
      const { author, reply } = Object.fromEntries(formData);
  
      
      console.log({ author, reply, commentId });
  
      const {status, error } = await addTrigger({
        author,
        reply,
        comment_id: commentId,
        user_id: user?.id
      })
  
      // Reset the form after submission?
      formRef.current.reset();
      setReplyActive(!replyActive)
    };
  

  return (
    <>
        <form className={styles.container} ref={formRef} onSubmit={handleOnSubmit}>
          <Input className={styles.input} placeholder='Author' name='author' />
          <Textarea className={styles.textarea} placeholder='Comment' name='reply' />
          <div className={styles.buttonsContainer}>
            <Button className={styles.button} onClick={() => setReplyActive(!replyActive)}>Cancel</Button>
            <Button className={styles.button} onClick={() => setRepliesOpen(true)} type='submit'>Submit</Button>
          </div>
        </form>
    </>
  )
}


