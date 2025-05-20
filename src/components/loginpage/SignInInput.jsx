import React from 'react';
import useInput from '../../hooks/useInput';
import Button from '../Button';
import PropTypes from 'prop-types';

function SignInInput({ signIn }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form
      className="mt-10 flex flex-col gap-4"
      onSubmit={(event) => signIn({ event, email, password })}
    >
      <div className="flex flex-col gap-2">
        <label>E-mail</label>
        <input
          type="email"
          placeholder="Enter your e-mail"
          className="focus:ring-primary w-full rounded-lg border border-slate-400 px-6 py-3 text-sm outline-none focus:ring-2 md:text-base"
          value={email}
          onChange={onEmailChange}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="focus:ring-primary w-full rounded-lg border border-slate-400 px-6 py-3 text-sm outline-none focus:ring-2 md:text-base"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>
      <Button
        type="submit"
        className="bg-primary border-primary hover:text-primary mt-4 w-full rounded-lg border px-4 py-2 font-semibold text-white hover:bg-white md:text-lg"
      >
        Login
      </Button>
    </form>
  );
}

SignInInput.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default SignInInput;
