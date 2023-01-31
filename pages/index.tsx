import Head from "next/head";
import { useContextful, Author, Posts } from "../hooks/useContentful";
import { NextPage } from "next";
import { useEffect, useState } from "react";


interface AuthorWithId extends Author {
  id: string;
}

interface Props {
  data: AuthorWithId[] | undefined;
}

const Index: NextPage<Props> = ({ data }) => {
  const [posts, setPosts] = useState<Posts[]>();
  console.log(data);

  const { getPosts } = useContextful();
  useEffect(() => {
    const loadPosts = async (name: string) => {
      const response = await getPosts(name);
      setPosts(response?.map((item) => item.fields));
    };
    if (data) {
      loadPosts(data[1].name);
    }
  }, [data]);
  console.log(posts);

  return (
    <>
      <Head>
        <title>Home Page | Next</title>
        <meta name="keywords" content="react,nextjs" />
        <meta name="description" content="This is tutorial course" />
      </Head>
      <h1>Hello Next.JS!</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>

      {data?.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <p>{item.email}</p>
          {posts?.length && (
            <>
              <h4>Posts:</h4>
              {posts.map((post) => (
                <p>{post.post}</p>
              ))}
            </>
          )}
        </div>
      ))}
    </>
  );
};

Index.getInitialProps = async () => {
  const { getAuthors } = useContextful();
  const response = await getAuthors();
  const data = response?.items.map((item) => ({
    ...item.fields,
    id: item.sys.id,
  }));
  return { data };
};

export default Index;
