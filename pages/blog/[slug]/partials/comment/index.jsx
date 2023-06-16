import Button from "@components/button";
import styles from "./comment.module.css";
import { removeComment } from "../../../../../api-routes/comments";
import useSWRMutation from 'swr/mutation'
import { cacheKey } from "../comments/index";
import { useUser } from "@supabase/auth-helpers-react";
import { postAuthor } from "../..";
import { createUsername } from "../../../../../utils/createUsername";
import { useState } from "react";

export default function Comment({ comment, created_at, author, id, user_id }) {
  let isAuthorized = false
  
  const user = useUser()

  if (user) {
    isAuthorized = user.id === user_id || user.id === postAuthor ? true : false
  }

  const userName = createUsername(author)
  
  const { trigger: deleteTrigger } = useSWRMutation(`${cacheKey}${id}`, removeComment);

  const handleDelete = async () => {
    console.log({ id, comment, author, user_id });
    const {status, error}  = await deleteTrigger({id});
  };
  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{userName}</p>
      <time className={styles.date}>{created_at}</time>

      {/* The Delete part should only be showed if you are authenticated and you are the author */}
      {isAuthorized && <div className={styles.buttonContainer}>
        <Button onClick={handleDelete}>Delete</Button>
      </div>}
    </div>
  );
}
