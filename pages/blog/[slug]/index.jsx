import { useRouter } from "next/router";
import styles from "./blog-post.module.css";
import Comments from "./partials/comments";
import AddComment from "./partials/add-comment";
import Button from "@components/button";
import Heading from "@components/heading";
import BlogImageBanner from "@components/blog-image-banner";
import { getPost, removePost,editPost } from "../../../api-routes/posts";
import { cacheKey } from "..";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import CreatePost from "../../create-post";


export default function BlogPost() {
  const router = useRouter();

  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;

  const { data: { data = [] } = {}, error } = useSWR(`${cacheKey}${slug}`, () => getPost({ slug }));

  const handleDeletePost = async () => {

    const {data, status}  = await deleteTrigger({ slug });

    console.log(data, status)
  

    console.log({ id: post.id });
  };

  const handleEditPost = () => {
    router.push(`/blog/${slug}/edit`);
  };

  

  // const { trigger: editTrigger } = useSWRMutation(cacheKey, editCharacter, {
    
  // });

  const { trigger: deleteTrigger } = useSWRMutation(`${cacheKey}${slug}`, () => removePost({ slug }));

  const handleEditCharacter = async ({ id, name }) => {
    const { data, status } = await editTrigger({ id, name });

    if (status !== 200) {
      setToaster({
        message: data.message,
        type: "error",
      });
    }
  };

  return (
    <>
      <section className={styles.container}>
        <Heading>{data.title}</Heading>
        {data?.image && <BlogImageBanner src={data.image} alt={data.title} />}
        <div className={styles.dateContainer}>
          <time className={styles.date}>{data.createdAt}</time>
          <div className={styles.border} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.body }} />
        <span className={styles.author}>Author: {data.author}</span>

        {/* The Delete & Edit part should only be showed if you are authenticated and you are the author */}
        <div className={styles.buttonContainer}>
          <Button onClick={handleDeletePost}>Delete</Button>
          <Button onClick={handleEditPost}>Edit</Button>
        </div>
      </section>

      {/* <Comments postId={post.id} /> */}

      {/* This component should only be displayed if a user is authenticated */}
      {/* <AddComment postId={post.id} /> */}
    </>
  );
}
