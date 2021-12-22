import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import InputGroup from '../components/InputGroup';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  // console.log(errors);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await axios.post('/auth/login', {
        username,
        password,
      });
      router.push('/');
    } catch (err: any) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className='flex'>
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
