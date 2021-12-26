import Axios from 'axios';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { Post } from '../types';
import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { IoMdShareAlt } from 'react-icons/io';
import { GoComment } from 'react-icons/go';

dayjs.extend(relativeTime);

// const Home: NextPage = ({
//   posts,
// }: InferGetStaticPropsType<typeof getStaticProps>) => {
const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  console.log(posts);

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
          <div key={post.identifier} className='flex mb-4 bg-white rounded'>
            {/* Vote section */}
            <div className='w-10 text-center bg-gray-200 rounded-l'>
              <p>V</p>
            </div>
            {/* Post data section */}
            <div className='w-full p-2'>
              <div className='flex items-center'>
                <Fragment>
                  <img
                    src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                    className='w-6 h-6 mr-1 rounded-full cursor-pointer'
                    alt=''
                  />
                  <Link href={`/r/${post.subName}`}>
                    <a className='text-xs font-bold cursor-pointer hover:underline'>
                      /r/{post.subName}
                    </a>
                  </Link>
                </Fragment>
                <p className='text-xs text-gray-500'>
                  <span className='mx-1'>•</span>
                  Posted by
                  <Link href={`/u/${post.username}`}>
                    <a className='mx-1 hover:underline'>/u/{post.username}</a>
                  </Link>
                  <Link href={post.url}>
                    <a className='mx-1 hover:underline'>
                      {dayjs(post.createdAt).fromNow()}
                    </a>
                  </Link>
                </p>
              </div>
              <Link href={post.url}>
                <a className='my-1 text-lg font-medium'>{post.title}</a>
              </Link>
              {post.body && <p className='my-1 text-sm'>{post.body}</p>}

              <div className='flex'>
                <Link href={`${post.url}`}>
                  <a>
                    <div className='flex items-center gap-1 px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200'>
                      <GoComment />
                      <span className='font-bold'>20 Comments</span>
                    </div>
                  </a>
                </Link>
                <div className='flex items-center gap-1 px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200'>
                  <IoMdShareAlt />
                  <span className='font-bold'>Share</span>
                </div>
                <div className='flex items-center gap-1 px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200'>
                  <BsFillBookmarkFill />
                  <span className='font-bold'>Save</span>
                </div>
              </div>
            </div>
          </div>
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
