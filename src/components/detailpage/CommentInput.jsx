import React from 'react';
import useInput from '../../hooks/useInput';
import PropTypes from 'prop-types';
import Button from '../Button';

function CommentInput({ createCommentHandler }) {
  const [content, setContent] = useInput('');

  const createComment = (event) => {
    event.preventDefault();

    createCommentHandler(content);
    setContent('');
  };

  return (
    <form onSubmit={createComment}>
      <input
        type="text"
        placeholder="Add your comment to this thread here..."
        className="focus:border-b-primary w-full border-b border-b-slate-500 px-4 py-2 pb-2 text-sm outline-none md:text-base"
        value={content}
        onChange={setContent}
        required
      />
      <Button
        type="submit"
        className="bg-primary border-primary hover:text-primary mt-8 rounded-lg border px-5 py-2 text-sm font-semibold text-white hover:bg-transparent disabled:cursor-not-allowed disabled:border-slate-500 disabled:bg-slate-500 disabled:hover:bg-slate-500 disabled:hover:text-white md:text-base"
        disabled={content.length === 0 ? true : false}
      >
        Submit Comment
      </Button>
    </form>
  );
}

CommentInput.propTypes = {
  createCommentHandler: PropTypes.func.isRequired,
};

export default CommentInput;
