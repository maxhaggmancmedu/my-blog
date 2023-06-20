import styles from "./replies.module.css";
import Reply from "../reply";
import useSWR from 'swr'
import { getReplies } from "../../../../../api-routes/replies";
import { useEffect } from "react";

export const cacheKey = 'replies'

export default function Replies({replyActive, commentId }) {
  
  const { data: { data = [] } = {}, error } = useSWR(commentId ? `${cacheKey}${commentId}`: null, () => getReplies({ commentId }));

  return (
    <>
        {!replyActive && <div className={styles.container}>
        {data.length > 0 && <h2 className={styles.h2}>Replies</h2>}
        {data?.map((reply) => (
            <Reply key={reply.id} {...reply} commentId={commentId} />
        ))}
        </div>}
    </>
  );
}