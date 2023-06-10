import styles from "./comments.module.css";
import Comment from "../comment";
import useSWR from 'swr'
import { getComments } from "../../../../../api-routes/comments";

const cacheKey = 'comment'

const mockData = [
  {
    id: "1",
    comment: "Love this post!",
    createdAt: "2022-02-15",
    author: "John Doe",
  },
  {
    id: "2",
    comment: "This is indeed a good community fit!",
    createdAt: "2022-02-12",
    author: "Jane Doe",
  },
];

export default function Comments(/*{ postId }*/) {
  /* 
  Here is a good place to fetch the comments from the database that has a 
  foreign key relation to the post.
  

  */

  const postId = '0d017c44-3c9a-405f-bdc6-68848abad576'

  const { data: { data = [] } = {}, error } = useSWR(`${cacheKey}`, () => getComments({ postId }));

  console.log(data)

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {mockData.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}
