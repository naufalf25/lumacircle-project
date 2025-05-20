import React, { useState } from 'react';
import RegisterInput from '../components/loginpage/RegisterInput';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/user/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function onRegister({ event, name, email, password }) {
    event.preventDefault();
    setLoading(true);

    dispatch(asyncRegisterUser({ name, email, password }));

    setLoading(false);
    alert('Registration successful! Please log in.');
    navigate('/login');
  }

  return (
    <section className="font-poppins flex min-h-[94vh] items-center justify-center bg-[#F5EEDC] p-4 lg:p-20">
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
