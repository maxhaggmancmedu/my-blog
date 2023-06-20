import React from 'react'
import styles from './reply.module.css'
import { formatDate } from '../../../../../utils/formatDate'
import { cacheKey } from '../replies'
import useSWRMutation from 'swr/mutation'
import { removeReply } from '../../../../../api-routes/replies'
import Button from '@components/button'

export default function Reply({...reply}) {

    const { formattedDate } = formatDate(reply?.created_at)

    console.log(reply.id)

    const { trigger: deleteTrigger } = useSWRMutation(`${cacheKey}${reply.id}`, removeReply);

    const handleDelete = async () => {
        const {status, error}  = await deleteTrigger({id: reply.id});
    };

    return (
        <div className={styles.container}>
            <div className={styles.replyContent}>
                <p>{reply.reply}</p>
                <p className={styles.author}>{reply.author}</p>
                <time className={styles.date}>{formattedDate}</time>
            </div>
            <Button className={styles.button} onClick={handleDelete}>Delete</Button>
        </div>
    )
}
