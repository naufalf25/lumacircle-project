import React from 'react';
import parse from 'html-react-parser';
import { postedAt } from '../../utils';
import PropTypes from 'prop-types';
import VoteButton from '../VoteButton';
import { useSelector } from 'react-redux';

function CommentItem({ comment, onUpvote, onDownvote }) {
  const { id, content, createdAt, owner } = comment;
  const { authUser } = useSelector((states) => states);

  const totalVote = comment.upVotesBy.length - comment.downVotesBy.length;
  const userUpVote = comment.upVotesBy.includes(authUser?.id) || false;
  const userDownVote = comment.downVotesBy.includes(authUser?.id) || false;

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-lg md:p-6">
      <div className="flex items-center gap-4 md:gap-6">
        <img src={owner.avatar} alt="profile" className="w-8 rounded-full" />
        <p className="text-sm font-semibold">{owner.name}</p>
      </div>
      <div className="mt-4 flex items-start gap-4 md:gap-6">
        <VoteButton
          id={id}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
          totalVote={totalVote}
          userUpVote={userUpVote}
          userDownVote={userDownVote}
        />
        <div className="flex flex-col gap-4">
          <div className="mt-2 text-sm md:text-base">{parse(content)}</div>
          <p className="mt-2 text-sm text-slate-500 italic">
            {postedAt(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
  }),
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default CommentItem;
