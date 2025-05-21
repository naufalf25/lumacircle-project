import React, { useEffect, useState } from 'react';
import ThreadItem from './ThreadItem';
import PropTypes from 'prop-types';
import Loading from '../Loading';

function ThreadLists({ threads, onUpvote, onDownvote }) {
  const threadsSorted = threads.sort((a, b) => b.createdAt - a.createdAt);
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex flex-col gap-10">
      {isWaiting && threads.length === 0 && <Loading />}
      {!isWaiting && threads.length === 0 && (
        <div className="w-full rounded-xl bg-white p-4 shadow-lg md:p-6">
          <p className="text-center text-xl font-semibold">
            Threads data not available!
          </p>
        </div>
      )}
      {threadsSorted.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
        />
      ))}
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
