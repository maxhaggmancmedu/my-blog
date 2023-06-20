import styles from "./comments.module.css";
import Comment from "../comment";
import useSWR from 'swr'
import { getComments } from "../../../../../api-routes/comments";
import { useEffect } from "react";

export const cacheKey = 'comments'

export default function Comments({ postId }) {
  /* 
  Here is a good place to fetch the comments from the database that has a 
  foreign key relation to the post.
  */

  const { data: { data = [] } = {}, error } = useSWR(postId ? `${cacheKey}${postId}`: null, () => getComments({ postId }));

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {data?.map((comment) => (
        <Comment key={comment.id} {...comment} postId={postId} />
      ))}
    </div>
  );
}
