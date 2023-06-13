import styles from "./comments.module.css";
import Comment from "../comment";
import useSWR from 'swr'
import { getComments } from "../../../../../api-routes/comments";
import { useEffect } from "react";

const cacheKey = 'comments'

export default function Comments({ postId }) {
  /* 
  Here is a good place to fetch the comments from the database that has a 
  foreign key relation to the post.
  

  */

  
  const { data: { data = [] } = {}, error } = useSWR(`${cacheKey}`, () => getComments({ postId }));
  

  

  console.log(data)

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {data?.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}
