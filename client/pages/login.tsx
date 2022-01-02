import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';
import InputGroup from '../components/InputGroup';
import { useAuthDispatch, useAuthState } from '../context/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const { authenticated } = useAuthState();

  // console.log(errors);
  const dispatch = useAuthDispatch();

  const router = useRouter();
  useEffect(() => {
    if (authenticated) router.push('/');
  }, [authenticated, router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await axios.post('/auth/login', {
        username,
        password,
      });

      dispatch('LOGIN', res.data);

      router.push('/');
    } catch (err: any) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className='flex bg-white'>
      <Head>
        <title>Login</title>
      </Head>

      <div
        className='w-40 h-screen bg-center bg-cover'
        style={{ backgroundImage: "url('/images/building.jpg')" }}
      ></div>
      <div className='flex flex-col content-center justify-center pl-6'>
        <div className='w-70'>
          <h1 className='mb-2 text-lg font-medium'>Login</h1>
          <p className='mb-10 text-xs'>
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>

          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
          <small>
            New to reddit?{' '}
            <Link href='/register'>
              <a className='ml-1 text-blue-500 uppercase'>Sign up</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
