import React from 'react';
import { Link } from 'react-router';
import CommentInput from './CommentInput';

function CreateComment({ authUser, createCommentHandler }) {
  return (
    <div className="mt-10 w-full rounded-xl bg-white p-4 shadow-lg md:p-6 lg:p-10">
      {!authUser ? (
        <div className="flex items-center justify-center">
          <p>
            <Link
              to="/login"
              className="text-primary hover:text-secondary font-semibold underline"
            >
              Login
            </Link>
            <span> to add new comment here</span>
          </p>
        </div>
      ) : (
        <CommentInput createCommentHandler={createCommentHandler} />
      )}
    </div>
  );
}

export default CreateComment;
