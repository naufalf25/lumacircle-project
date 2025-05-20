import React from 'react';
import SignInInput from '../components/loginpage/SignInInput';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import { useState } from 'react';

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function onSignIn({ event, email, password }) {
    event.preventDefault();
    setLoading(true);

    dispatch(asyncSetAuthUser({ email, password }));

    setLoading(false);
    navigate('/');
  }

  return (
    <section className="font-poppins flex min-h-[94vh] items-center justify-center bg-[#F5EEDC] p-4 lg:p-20">
      <div className="w-full max-w-[500px] rounded-lg bg-white p-4 md:p-10">
        <h1 className="text-center text-xl font-semibold tracking-wide md:text-2xl">
          Sign In
        </h1>
        <SignInInput signIn={onSignIn} loading={loading} />
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-primary hover:text-secondary font-semibold underline"
          >
            Register Here
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignInPage;
