import React from 'react';
import SignInInput from '../components/loginpage/SignInInput';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import { motion } from 'motion/react';
import LoggedIn from '../components/LoggedIn';

function SignInPage() {
  const { loading, authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  function onSignIn({ event, email, password }) {
    event.preventDefault();

    dispatch(asyncSetAuthUser({ email, password }));
  }

  return (
    <section className="font-poppins flex min-h-[92.8vh] items-center justify-center bg-[#F5EEDC] px-4 py-20 lg:p-20">
      <motion.div
        initial={{ opacity: 0, y: -500 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 50 },
        }}
        className="w-full max-w-[500px] rounded-lg bg-white p-4 md:p-10"
      >
        {authUser ? (
          <LoggedIn />
        ) : (
          <>
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
          </>
        )}
      </motion.div>
    </section>
  );
}

export default SignInPage;
