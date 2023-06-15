import { useRouter } from "next/router";
import styles from "./blog-post.module.css";
import Comments from "./partials/comments";
import AddComment from "./partials/add-comment";
import Button from "@components/button";
import Heading from "@components/heading";
import BlogImageBanner from "@components/blog-image-banner";
import { getPost, removePost, editPost } from "../../../api-routes/posts";
import { cacheKey } from "..";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import CreatePost from "../../create-post";
import { useUser } from "@supabase/auth-helpers-react";
export let postAuthor;
import { createUsername } from "../../../utils/createUsername";

export default function BlogPost() {
  const router = useRouter();

  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;
  const { data: { data = [] } = {}, error } = useSWR(`${cacheKey}${slug}`, () => getPost({ slug }));
  const user = useUser()
  console.log(user)
  postAuthor = data?.user_id
   
  // const userName = createUsername(user.email)
  const isAuthor = user.id === data?.user_id ? true : false
  
  const { trigger: deleteTrigger } = useSWRMutation(`${cacheKey}${slug}`, removePost);

  const handleDeletePost = async () => {
    const { status, error}  = await deleteTrigger(data.id);
    router.push(`/blog`);
  };

  const handleEditPost = () => {
    router.push(`/blog/${slug}/edit`);
  };

  return (
    <>
      <section className={styles.container}>
        <Heading>{data?.title}</Heading>
        {data?.image && <BlogImageBanner src={data.image} alt={data.title} />}
        <div className={styles.dateContainer}>
          <time className={styles.date}>{data?.created_at}</time>
          <div className={styles.border} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: data?.body }} />
        {/* <span className={styles.author}>Author: {userName}</span> */}

        {/* The Delete & Edit part should only be showed if you are authenticated and you are the author */}
        {isAuthor && <div className={styles.buttonContainer}>
          <Button onClick={handleDeletePost}>Delete</Button>
          <Button onClick={handleEditPost}>Edit</Button>
        </div>}
      </section>

      <Comments postId={data?.id} userId={data?.user_id}/>

      {/* This component should only be displayed if a user is authenticated */}
      <AddComment postId={data?.id} />
    </>
  );
}

