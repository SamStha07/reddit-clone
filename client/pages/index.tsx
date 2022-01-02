import Axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Post } from '../types';
import PostCard from '../components/PostCard';

// const Home: NextPage = ({
//   posts,
// }: InferGetStaticPropsType<typeof getStaticProps>) => {
const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  // console.log(posts);

  useEffect(() => {
    Axios.get('/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className='pt-12 '>
      <Head>
        <title>Reddit</title>
      </Head>
      <div className='container pt-4'>
        {posts.map((post: Post) => (
          <PostCard key={post.identifier} post={post} />
        ))}
      </div>
    </div>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const res = await Axios.get('/posts');
//     const posts: Post[] = await res.data;

//     return {
//       props: {
//         posts,
//       },
//     };
//   } catch (err) {
//     return { props: { error: 'Something went wrong' } };
//   }
// };

export default Home;
