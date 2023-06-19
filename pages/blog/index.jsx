import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";
import { getPosts } from "../../api-routes/posts";
import useSWR from "swr";
export const cacheKey = "/api/posts";
import { useState } from "react";
import classNames from "classnames";

const getFilteredPosts = (query, posts) => {
  if (!query) {
      return posts
  }
  return posts.filter(post => post.title.includes(query))
}

export default function Blog(className) {
    const { data: { data = [] } = {}, error } = useSWR(cacheKey, getPosts);

    const [searchQuery, setSearchQuery] = useState('')
    
    const filteredPosts = getFilteredPosts(searchQuery, data)

    console.log(filteredPosts)
  
  return (
    <section>
      <Heading>Blog</Heading>
      <form className={styles.form}>
        <label style={{textTransform: 'uppercase', fontWeight: '600'}} htmlFor='search'>Search blogs</label>
        <input id="search" placeholder="Search" className={classNames(styles.container)} onChange={(e) => setSearchQuery(e.target.value)} />
      </form>
      {filteredPosts.map((post) => (
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