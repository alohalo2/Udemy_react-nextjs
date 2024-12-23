// import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import Post from "./Post";
import classes from "./PostList.module.css";

function PostList() {
    const posts = useLoaderData();

    // const [posts, setPosts] = useState([]);
    // const [isFetching, setIsFetching] = useState(false);

    // useEffect(() => {
    //     async function fetchPosts() {
    //         setIsFetching(true);
    //         // const response = await fetch("http://localhost:8080/posts");
    //         // const resData = await response.json();
    //         setPosts(resData.posts);
    //         setIsFetching(false);
    //     }

    //     fetchPosts();
    // }, []);

    return (
        <>
            {/*!isFetching &&*/ posts.length > 0 && (
                <ul className={classes.posts}>
                    {posts.map((post) => (
                        <Post key={post.body} id={post.id} author={post.author} body={post.body} />
                    ))}
                </ul>
            )}
            {/*!isFetching &&*/ posts.length === 0 && (
                <div style={{ textAlign: "center", color: "white" }}>
                    <h2>There are no posts yet.</h2>
                    <p>Start adding some!</p>
                </div>
            )}
            {/* {isFetching && (
                <div style={{ textAlign: "center", color: "white" }}>
                    <p>Loading posts...</p>
                </div>
            )} */}
        </>
    );
}

export default PostList;
