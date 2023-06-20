import React from 'react'
import styles from './reply.module.css'
import { formatDate } from '../../../../../utils/formatDate'

export default function Reply({...reply}) {

    const { formattedDate } = formatDate(reply?.created_at)

    return (
        <div className={styles.container}>
            <p>{reply.reply}</p>
            <p className={styles.author}>{reply.author}</p>
            <time className={styles.date}>{formattedDate}</time>
        </div>
    )
}
