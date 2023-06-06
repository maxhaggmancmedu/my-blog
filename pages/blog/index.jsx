import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";
import { getPosts } from "../../api-routes/posts";
import useSWR from "swr";
export const cacheKey = "/api/posts";

export default function Blog() {
    const { data: { data = [] } = {}, error } = useSWR(cacheKey, getPosts);
  
  return (
    <section>
      <Heading>Blog</Heading>
      {data.map((post) => (
        <Link
          key={post.slug}
          className={styles.link}
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col">
            <p>{post.title}</p>
            <time className={styles.date}>{post.createdAt}</time>
          </div>
        </Link>
      ))}
    </section>
  );
}