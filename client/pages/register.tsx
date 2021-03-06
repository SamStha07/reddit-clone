import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';
import InputGroup from '../components/InputGroup';
import { useAuthState } from '../context/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const { authenticated } = useAuthState();

  const router = useRouter();
  // if (authenticated) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: true,
  //     },
  //   };
  // }
  // NOTE: OR
  useEffect(() => {
    if (authenticated) void router.push('/');
  }, [authenticated, router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!agreement) {
      setErrors({ ...errors, agreement: 'You must agree to T&Cs' });
      return;
    }

    try {
      await axios.post('/auth/register', {
        email,
        username,
        password,
      });
      router.push('/login');
    } catch (err: any) {
      // console.log(err.response.data);
      setErrors(err.response.data);
    }
  };

  return (
    <div className='flex bg-white'>
      <Head>
        <title>Register</title>
      </Head>

      <div
        className='w-40 h-screen bg-center bg-cover'
        style={{ backgroundImage: "url('/images/building.jpg')" }}
      ></div>
      <div className='flex flex-col content-center justify-center pl-6'>
        <div className='w-70'>
          <h1 className='mb-2 text-lg font-medium'>Sign up</h1>
          <p className='mb-10 text-xs'>
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <input
                type='checkbox'
                className='mr-1 cursor-pointer'
                id='agreement'
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <label htmlFor='agreement' className='text-xs cursor-pointer'>
                I agree to get emails about coll stuff on reddit.
              </label>
              <small className='block font-medium text-red-600'>
                {errors.agreement}
              </small>
            </div>
            <InputGroup
              className='mb-2'
              value={email}
              placeholder='Email'
              error={errors.email}
              setValue={setEmail}
              type='email'
            />
            <InputGroup
              className='mb-2'
              value={username}
              placeholder='Username'
              error={errors.username}
              setValue={setUsername}
              type='text'
            />
            <InputGroup
              className='mb-2'
              value={password}
              placeholder='Password'
              error={errors.password}
              setValue={setPassword}
              type='password'
            />

            <button
              type='submit'
              className='w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded'
            >
              Sign up
            </button>
          </form>
          <small>
            Already a redditor?{' '}
            <Link href='/login'>
              <a className='ml-1 text-blue-500 uppercase'>Login</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
