import React, { useState } from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';
import ContentEditable from 'react-contenteditable';

function CreateThread({ onCreateThread, authUser }) {
  const [title, setTitle] = useInput('');
  const [body, setBody] = useInput('');
  const [category, setCategory] = useInput('');
  const [openInput, setOpenInput] = useState(false);

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
      {openInput && (
        <form
          onSubmit={(event) => onCreateThread({ event, title, body, category })}
          className="mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Your thread title here"
              className="focus:border-b-primary border-b-2 border-b-transparent px-4 py-2 pb-2 font-semibold outline-none md:text-lg lg:text-xl"
              value={title}
              onChange={setTitle}
              required
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <ContentEditable
              className="focus:border-b-primary border-b-2 border-b-transparent px-4 py-2 pb-2 outline-none"
              html={body}
              onChange={setBody}
              data-placeholder="What you think to write about this thread....."
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Your thread category here"
              className="rounded-lg px-4 py-2 text-sm outline-none"
              value={category}
              onChange={setCategory}
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-primary border-primary hover:text-primary mt-4 rounded-lg border px-4 py-1 text-lg font-semibold text-white hover:bg-transparent"
          >
            Create New Thread
          </Button>
        </form>
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
