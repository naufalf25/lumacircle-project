import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';
import Button from '../Button';
import Loading from '../Loading';

function RegisterInput({ register, loading }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form
      className="mt-10 flex w-full flex-col gap-4"
      onSubmit={(event) => register({ event, name, email, password })}
    >
      <div className="flex flex-col gap-2">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="focus:ring-primary w-full rounded-lg border border-slate-400 px-6 py-3 text-sm outline-none focus:ring-2 md:text-base"
          value={name}
          onChange={onNameChange}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Email</label>
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
        {loading ? <Loading /> : 'Register'}
      </Button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
  laoding: PropTypes.bool.isRequired,
};

export default RegisterInput;
