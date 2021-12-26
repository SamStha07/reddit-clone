import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RedditLogo from '../images/logo.svg';
import { BsSearch } from 'react-icons/bs';

const Navbar: React.FC = () => {
  return (
    <div className='fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white'>
      <Link href='/' passHref>
        <div className='flex items-center gap-1 cursor-pointer'>
          <Image
            src={RedditLogo}
            alt='Picture of the author'
            width={40}
            height={40}
          />
          <p className='text-2xl font-semibold'>reddit</p>
        </div>
      </Link>
      {/* Serach Input */}
      <div className='flex items-center gap-2 px-4 mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white'>
        <BsSearch />
        <input
          type='text'
          className='py-1 pr-3 bg-transparent rounded w-160 focus:outline-none'
          placeholder='Search'
        />
      </div>
      {/* Auth buttons */}
      <div className='flex gap-4'>
        <Link href='/login'>
          <a className='w-32 py-1 leading-5 hollow blue button'>log in</a>
        </Link>
        <Link href='/register'>
          <a className='w-32 py-1 leading-5 blue button'>sign up</a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
