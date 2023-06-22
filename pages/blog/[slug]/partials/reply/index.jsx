import React from 'react'
import styles from './reply.module.css'
import { formatDate } from '../../../../../utils/formatDate'
import { cacheKey } from '../replies'
import useSWRMutation from 'swr/mutation'
import { removeReply } from '../../../../../api-routes/replies'
import Button from '@components/button'
import { useUser } from '@supabase/auth-helpers-react'

export default function Reply({userId: commentUserId, commentId, postUserId, ...reply}) {

    const user = useUser()
    let isAuthorized = false
    // const { formattedDate } = formatDate(reply.created_at)

    if (user) {
        isAuthorized = user.id === reply.user_id || user.id === commentUserId || user.id === postUserId ? true : false
    }

    const { trigger: deleteTrigger } = useSWRMutation(`${cacheKey}${commentId}`, removeReply);

    const handleDelete = async () => {
        const {status, error}  = await deleteTrigger({id: reply.id});
    };

    return (
        <div className={styles.container}>
            <div className={styles.replyContent}>
                <p>{reply.reply}</p>
                <p className={styles.author}>{reply.author}</p>
                <time className={styles.date}>{reply.created_at}</time>
            </div>
            {isAuthorized && <Button className={styles.button} onClick={handleDelete}>Delete</Button>}
        </div>
    )
}
