import Image from 'next/image';
import React from 'react';

const Register = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='max-w-xs my-2 overflow-hidden rounded shadow-lg'>
        <div className='px-6 py-4'>
          <div className='mb-2 text-xl font-bold'>Next + Tailwind ❤️</div>
          <p className='text-base text-grey-darker'>
            Next and Tailwind CSS are a match made in heaven, check out this
            article on how you can combine these two for your next app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
