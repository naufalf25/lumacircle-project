import React from 'react';
import { FaRegComment } from 'react-icons/fa';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { postedAt } from '../../utils';
import VoteButton from '../VoteButton';
import { useSelector } from 'react-redux';

function ThreadItem({ thread, onUpvote, onDownvote }) {
  const {
    id,
    title,
    body,
    category,
    upVotesBy,
    downVotesBy,
    totalComments,
    createdAt,
    user,
    owner,
  } = thread;
  const { authUser } = useSelector((states) => states);

  const totalVote = upVotesBy.length - downVotesBy.length;
  const userUpVote = upVotesBy.includes(authUser?.id) || false;
  const userDownVote = downVotesBy.includes(authUser?.id) || false;

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-lg md:p-6">
      <div className="flex flex-col items-start gap-4 md:gap-6">
        <div className="flex items-center gap-4 md:gap-6">
          <img
            src={user ? user.avatar : owner.avatar}
            alt="profile"
            className="w-8 rounded-full"
          />
          <p className="text-sm font-semibold">
            {user ? user.name : owner.name}
          </p>
        </div>
        <div className="flex items-start gap-4 md:gap-6">
          <VoteButton
            id={id}
            onUpvote={onUpvote}
            onDownvote={onDownvote}
            totalVote={totalVote}
            userUpVote={userUpVote}
            userDownVote={userDownVote}
          />
          <div>
            {user ? (
              <Link
                to={`/thread/${id}`}
                className="text-secondary hover:text-primary text-lg font-semibold md:text-xl"
              >
                {title}
              </Link>
            ) : (
              <h2 className="text-secondary text-lg font-semibold md:text-xl">
                {title}
              </h2>
            )}
            <div
              className={`mt-2 text-sm md:text-base ${user && 'line-clamp-4'}`}
            >
              {parse(body)}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <p className="rounded-md border border-slate-700 px-2 py-1 text-sm text-slate-700 italic">
                #{category}
              </p>
            </div>
            <div className="mt-4">
              {user && (
                <div className="flex items-center gap-4">
                  <FaRegComment className="text-2xl" />
                  <p>
                    <span>{totalComments}</span> Komentar
                  </p>
                </div>
              )}
              <p className="mt-2 text-sm text-slate-500 italic">
                {postedAt(createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default ThreadItem;
