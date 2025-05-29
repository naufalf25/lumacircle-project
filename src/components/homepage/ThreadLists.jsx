import React, { useEffect, useState } from 'react';
import ThreadItem from './ThreadItem';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { motion } from 'motion/react';

function ThreadLists({ threads, onUpvote, onDownvote }) {
  const threadsSorted = threads.sort((a, b) => b.createdAt - a.createdAt);
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const threadMotionContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const threadMotionItem = {
    hidden: { opacity: 0, y: 200 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section>
      {isWaiting && threads.length === 0 && <Loading />}
      {!isWaiting && threads.length === 0 && (
        <div className="w-full rounded-xl bg-white p-4 shadow-lg md:p-6">
          <p className="text-center text-xl font-semibold">
            Threads data not available!
          </p>
        </div>
      )}
      <motion.div
        initial="hidden"
        animate="show"
        variants={threadMotionContainer}
        className="flex flex-col gap-10"
      >
        {threadsSorted.map((thread) => (
          <motion.div key={thread.id} variants={threadMotionItem}>
            <ThreadItem
              thread={thread}
              onUpvote={onUpvote}
              onDownvote={onDownvote}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

ThreadLists.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default ThreadLists;
