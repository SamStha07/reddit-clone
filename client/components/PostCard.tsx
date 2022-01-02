import axios from 'axios';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { Post } from '../types';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { IoMdShareAlt } from 'react-icons/io';
import { GoComment } from 'react-icons/go';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post;
}

const ActionButton = ({ children }: any) => {
  return (
    <div className='flex items-center gap-1 px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200'>
      {children}
    </div>
  );
};

const PostCard = ({
  post: {
    createdAt,
    identifier,
    slug,
    subName,
    title,
    updatedAt,
    url,
    username,
    body,
    commentCount,
    userVote,
    voteScore,
  },
}: PostCardProps) => {
  const vote = async (value: number) => {
    try {
      const res = await axios.post('/vote', {
        post_identifier: identifier,
        post_slug: slug,
        vote_value: value,
      });

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div key={identifier} className='flex mb-4 bg-white rounded'>
      {/* Vote section */}
      <div className='flex flex-col gap-1 w-10 text-center bg-gray-200 rounded-l'>
        {/* Upvote */}
        <div
          className='pt-3 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'
          onClick={() => vote(1)}
        >
          <ImArrowUp className={`${userVote === 1 && 'text-red-500'}`} />
        </div>
        <p className='text-xs text-center font-bold'>{voteScore}</p>
        {/* Downvote */}
        <div
          className='mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600'
          onClick={() => vote(-1)}
        >
          <ImArrowDown className={`${userVote === -1 && 'text-blue-600'}`} />
        </div>
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
            <Link href={`/r/${subName}`}>
              <a className='text-xs font-bold cursor-pointer hover:underline'>
                /r/{subName}
              </a>
            </Link>
          </Fragment>
          <p className='text-xs text-gray-500'>
            <span className='mx-1'>•</span>
            Posted by
            <Link href={`/u/${username}`}>
              <a className='mx-1 hover:underline'>/u/{username}</a>
            </Link>
            <Link href={url}>
              <a className='mx-1 hover:underline'>
                {dayjs(createdAt).fromNow()}
              </a>
            </Link>
          </p>
        </div>
        <Link href={url}>
          <a className='my-1 text-lg font-medium'>{title}</a>
        </Link>
        {body && <p className='my-1 text-sm'>{body}</p>}

        <div className='flex'>
          <Link href={`${url}`}>
            <a>
              <ActionButton>
                <GoComment />
                <span className='font-bold'>{commentCount} Comments</span>
              </ActionButton>
            </a>
          </Link>
          <ActionButton>
            <IoMdShareAlt />
            <span className='font-bold'>Share</span>
          </ActionButton>
          <ActionButton>
            <BsFillBookmarkFill />
            <span className='font-bold'>Save</span>
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
