import React from 'react';

import CommentItem from './CommentItem';
import PropTypes from 'prop-types';

function CommentLists({ comments, onUpvote, onDownvote }) {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} className="pl-6 md:pl-10">
          <div className="h-5 w-20 border-r-2 border-r-slate-500"></div>
          <CommentItem
            comment={comment}
            onUpvote={onUpvote}
            onDownvote={onDownvote}
          />
        </div>
      ))}
    </div>
  );
}

CommentLists.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
    }).isRequired,
  ),
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default CommentLists;
