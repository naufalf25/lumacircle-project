import React, { useState } from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import ThreadInput from './ThreadInput';
import { motion } from 'motion/react';

function CreateThread({ onCreateThread, authUser, openInput, setOpenInput }) {
  return (
    <section className="mb-4 rounded-lg bg-white p-4 shadow-lg lg:px-10">
      <div className="flex w-full items-center justify-between gap-2">
        <p
          className={`${openInput ? 'text-lg font-semibold text-black md:text-xl' : 'text-slate-400'}`}
        >
          {openInput
            ? 'Create New Thread'
            : 'Do you have something to share for everyone?'}
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
      {openInput && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        >
          <ThreadInput createThreadHandler={onCreateThread} />
        </motion.div>
      )}
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
