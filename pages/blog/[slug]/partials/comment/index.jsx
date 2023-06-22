import Button from "@components/button";
import styles from "./comment.module.css";
import { removeComment } from "../../../../../api-routes/comments";
import useSWRMutation from 'swr/mutation'
import { cacheKey } from "../comments/index";
import { useUser } from "@supabase/auth-helpers-react";
import { postAuthor } from "../..";
import { createUsername } from "../../../../../utils/createUsername";
import { useState } from "react";
import AddReply from "../add-reply";
import Replies from "../replies";
import { formatDate } from "../../../../../utils/formatDate";

export default function Comment({ comment, created_at, author, id, user_id, postId, postUserId }) {
  let isAuthorized = false
  const [replyActive, setReplyActive] = useState(false)
  const [repliesOpen, setRepliesOpen] = useState(false)
  
  const user = useUser()

  if (user) {
    isAuthorized = user.id === user_id || user.id === postAuthor ? true : false
  }
  
  const { trigger: deleteTrigger } = useSWRMutation(`${cacheKey}${postId}`, removeComment);

  const handleDelete = async () => {
    const {status, error}  = await deleteTrigger({id});
  };

  // const { formattedDate } = formatDate(created_at)
  

  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{created_at}</time>

      {/* The Delete part should only be showed if you are authenticated and you are the author */}
      <div className={styles.buttonContainer}>
        {isAuthorized && !replyActive && <Button onClick={handleDelete}>Delete</Button>}
        {!replyActive && <Button onClick={() => setReplyActive(!replyActive)}>Reply</Button>}
      </div>
      {replyActive && <AddReply replyActive={replyActive} setReplyActive={setReplyActive} commentId={id} repliesOpen={repliesOpen} setRepliesOpen={setRepliesOpen}/>}
      <Replies replyActive={replyActive} commentId={id} userId={user_id} postUserId={postUserId} repliesOpen={repliesOpen} setRepliesOpen={setRepliesOpen} />
      <div className={styles.brake} />
    </div>
  );
}
