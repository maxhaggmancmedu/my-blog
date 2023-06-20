import styles from "./replies.module.css";
import Reply from "../reply";
import useSWR from 'swr'
import { getReplies } from "../../../../../api-routes/replies";
import { useEffect, useState } from "react";

export const cacheKey = 'replies'

export default function Replies({replyActive, commentId, userId, postUserId, repliesOpen, setRepliesOpen }) {

  // const [isOpen, setIsOpen] = useState(false)
  
  const { data: { data = [] } = {}, error } = useSWR(commentId ? `${cacheKey}${commentId}`: null, () => getReplies({ commentId }));

  return (
    <>
        {!replyActive && <div className={styles.container}>
        {data.length > 0 && <h2 onClick={() => setRepliesOpen(!repliesOpen)} className={styles.h2}>Replies ({data.length})</h2>}
        {repliesOpen && data?.map((reply) => (
            <Reply key={reply.id} {...reply} commentId={commentId} userId={userId} postUserId={postUserId} />
        ))}
        </div>}
    </>
  );
}