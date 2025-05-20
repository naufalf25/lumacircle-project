import React, { useState } from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import ThreadInput from './ThreadInput';

function CreateThread({ onCreateThread, authUser }) {
  const [openInput, setOpenInput] = useState(false);

  const createThreadHandler = ({ event, title, body, category }) => {
    event.preventDefault();

    onCreateThread({ title, body, category });
    setOpenInput(false);
  };

  return (
    <section className="mb-4 rounded-lg bg-white p-4 shadow-lg lg:px-10">
      <div className="flex w-full items-center justify-between gap-2">
        <p className={`${openInput ? 'text-white' : 'text-slate-400'}`}>
          Do you have something to share for everyone?
        </p>
        <Button
          onClick={() =>
            authUser
              ? setOpenInput(!openInput)
              : alert('Please login first to create a thread!')
          }
          className={`rounded-lg border px-2 py-1 text-xl font-semibold text-white hover:bg-transparent ${openInput ? 'border-red-500 bg-red-500 hover:text-red-500' : 'bg-primary border-primary hover:text-primary'}`}
        >
          {openInput ? 'X' : '+ NEW'}
        </Button>
      </div>
      {openInput && <ThreadInput createThreadHandler={createThreadHandler} />}
    </section>
  );
}

CreateThread.propTypes = {
  onCreateThread: PropTypes.func.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default CreateThread;
