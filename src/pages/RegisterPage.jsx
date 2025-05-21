import React from 'react';
import RegisterInput from '../components/loginpage/RegisterInput';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncRegisterUser } from '../states/user/action';

function RegisterPage() {
  const { loading } = useSelector((states) => states);
  const dispatch = useDispatch();

  function onRegister({ event, name, email, password }) {
    event.preventDefault();

    dispatch(asyncRegisterUser({ name, email, password }));
  }

  return (
    <section className="font-poppins flex min-h-[94vh] items-center justify-center bg-[#F5EEDC] px-4 py-20 lg:p-20">
      <div className="w-full max-w-[500px] rounded-lg bg-white p-4 md:p-10">
        <h1 className="text-center text-xl font-semibold tracking-wide md:text-2xl">
          Register
        </h1>
        <RegisterInput register={onRegister} loading={loading} />
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary hover:text-secondary font-semibold underline"
          >
            Login Here
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
