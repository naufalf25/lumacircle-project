import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa';
import Button from '../Button';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { postedAt } from '../../utils';

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
  } = thread;

  const totalVote = upVotesBy.length - downVotesBy.length;

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-lg md:p-6">
      <div className="flex items-start gap-4 md:gap-6">
        <div className="flex flex-col items-center gap-12">
          <img src={user.avatar} alt="profile" className="w-8 rounded-full" />
          <div className="flex flex-col items-center gap-2">
            <Button onClick={() => onUpvote(id)} className="hover:opacity-70">
              <FaChevronUp className="text-2xl" title="Upvote Thread" />
            </Button>
            <p className="text-lg">{totalVote}</p>
            <Button onClick={() => onDownvote(id)} className="hover:opacity-70">
              <FaChevronDown className="text-2xl" title="Downvote Thread" />
            </Button>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">{user.name}</p>
          <div className="mt-4">
            <Link
              to="#"
              className="text-secondary hover:text-primary text-lg font-semibold md:text-xl"
            >
              {title}
            </Link>
            <div className="mt-2 line-clamp-4 text-sm md:text-base">
              {parse(body)}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <p className="rounded-md border border-slate-700 px-2 py-1 text-sm text-slate-700 italic">
              #{category}
            </p>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-4">
              <FaRegComment className="text-2xl" />
              <p>
                <span>{totalComments}</span> Komentar
              </p>
            </div>
            <p className="mt-2 text-sm text-slate-500 italic">
              {postedAt(createdAt)}
            </p>
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
