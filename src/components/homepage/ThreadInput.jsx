import React from 'react';
import useInput from '../../hooks/useInput';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
import Button from '../Button';

function ThreadInput({ createThreadHandler }) {
  const [title, setTitle] = useInput('');
  const [body, setBody] = useInput('');
  const [category, setCategory] = useInput('');

  return (
    <form
      onSubmit={(event) =>
        createThreadHandler({ event, title, body, category })
      }
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
          placeholder="What you think to write about this thread....."
          data-placeholder="What you think to write about this thread....."
          required
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
  );
}

ThreadInput.propTypes = {
  createThreadHandler: PropTypes.func.isRequired,
};

export default ThreadInput;
