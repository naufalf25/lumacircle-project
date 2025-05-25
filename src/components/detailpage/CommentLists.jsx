import React from 'react';
import CommentItem from './CommentItem';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';

const commentMotionContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const commentMotionItem = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function CommentLists({ comments, onUpvote, onDownvote }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={commentMotionContainer}
    >
      {comments.map((comment) => (
        <motion.div
          variants={commentMotionItem}
          key={comment.id}
          className="pl-6 md:pl-10"
        >
          <div className="h-5 w-20 border-r-2 border-r-slate-500"></div>
          <CommentItem
            comment={comment}
            onUpvote={onUpvote}
            onDownvote={onDownvote}
          />
        </motion.div>
      ))}
    </motion.div>
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
