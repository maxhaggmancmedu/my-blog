import classNames from "classnames";
import styles from "../input/input.module.css";
import { useState } from "react";
import searchStyles from "./searchStyles.module.css";

const getFilteredPosts = (query, posts) => {
    if (!query) {
        return posts
    }
    return posts.filter(post => post.title.includes(query))
}

export default function Search({ className, blogPosts }) {
    const [searchQuery, setSearchQuery] = useState('')
    
    const filteredPosts = getFilteredPosts(searchQuery, blogPosts)

    console.log(filteredPosts)

  return (
    <form className={searchStyles.form}>
        <label style={{textTransform: 'uppercase', fontWeight: '600'}} for='search'>Search blogs</label>
        <input id="search" placeholder="Search" className={classNames(styles.container, className)} onChange={(e) => setSearchQuery(e.target.value)} />
    </form>
  );
}