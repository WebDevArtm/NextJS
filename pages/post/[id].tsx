import { useState, useEffect } from "react";
import type { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  data: {
    id: number;
    userId: number;
    title: string;
    body: string;
  } | null;
}

const Post: NextPage<Props> = ({ data }) => {
  const [post, setPost] = useState(data);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${router.query.id}`
      );
      const data = await response.json();
      setPost(data);
    }

    if (!data) {
      load();
    }
  }, []);

  if (!post) {
    return <p>Loading</p>;
  }
  return (
    <>
      <h1>{post.title}</h1>
      <hr />
      <p>{post.body}</p>
      <Link href="/posts">Go back to posts</Link>
    </>
  );
};

interface NextPageContextProps extends NextPageContext {
  query: {
    id: string
  }
}

Post.getInitialProps = async (ctx : NextPageContextProps) => {
  if (!ctx.req) return { data: null };
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${ctx.query.id}`
  );
  const data = await response.json();
  return { data: data };
};

export default Post;
