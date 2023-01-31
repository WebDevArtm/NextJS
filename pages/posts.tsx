import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { GetServerSideProps, NextPage } from "next";

interface Props {
  data: [
    {
      id: number;
      userId: number;
      title: string;
      body: string;
    }
  ];
}

const Posts: NextPage<Props> = ({ data }) => {
  const [state, setState] = useState(data);

  useEffect(() => {
    async function load() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      await response.json().then((data) => setState(data));
    }

    if (!data) {
      load();
    }
  }, []);
  
  if (!state) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Posts Page | Next</title>
      </Head>
      <h1>Posts page</h1>
      <ul>
        {state.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post?.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

Posts.getInitialProps = async (ctx) => {
  if (!ctx.req) return { data: null };
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=0&_limit=5`
  );
  const data = await response.json();
  return { data: data };
};

// export const  getServerSideProps: GetServerSideProps = async (ctx) => {
//   const response = await fetch(
//     "https://jsonplaceholder.typicode.com/posts?_page=0&_limit=5"
//   );
//   const data = await response.json();
//   return {
//     props: { data },
//   };
// }

export default Posts;
