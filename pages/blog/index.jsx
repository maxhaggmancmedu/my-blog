import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";
import { getFilteredPosts, getPosts } from "../../api-routes/posts";
import useSWR from "swr";
export const cacheKey = "/api/posts";
import { useState } from "react";
import classNames from "classnames";
import useSWRMutation from "swr/mutation"
import { useEffect } from "react";

export default function Blog() {
    const { data: { data = [] } = {}, error, isLoading } = useSWR(cacheKey, getPosts);
    const [displayData, setDisplayData] = useState([])    
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
      if (data) {
        setDisplayData(data);
      }
    }, [data]);
    
    const { trigger: getFilteredPostsTrigger, isMutating } = useSWRMutation(
      cacheKey,
      getFilteredPosts
    );
  
    const handleOnSubmit = async (e) => {
      e.preventDefault()
      const {data: filteredData, status, error } = await getFilteredPostsTrigger(searchQuery)
      
      setDisplayData(filteredData)

      if (filteredData.length === 0) {
        const timeout = setTimeout(() => {
          setSearchQuery('')
          setDisplayData(data)
          document.getElementById("form").reset()
        }, 1000)
      }
    };

    
    
  return (
    <section>
      <Heading>Blog</Heading>
      <form id="form" className={styles.form}>
        <label style={{textTransform: 'uppercase', fontWeight: '600'}} htmlFor='search'>Search blogs</label>
        <div className={styles.inputContainer}>
        <input id="search" placeholder="Search" className={classNames(styles.container)} onChange={(e) => setSearchQuery(e.target.value)} />
        <button className={styles.button} onClick={handleOnSubmit}>Search</button>
        </div>
      </form>
      {displayData?.map((post) => (
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
      {displayData.length === 0 && !isLoading && 
      <div style={{color: 'red'}}>No posts found</div>
      }
    </section>
  );
}