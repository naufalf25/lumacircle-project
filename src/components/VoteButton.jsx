import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function VoteButton({
  id,
  onUpvote,
  onDownvote,
  totalVote,
  userUpVote = false,
  userDownVote = false,
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={() => onUpvote(id)} className="hover:opacity-70">
        <FaChevronUp
          className={`text-2xl ${userUpVote ? 'text-primary' : ''}`}
          title="Upvote Thread"
        />
      </Button>
      <p className="text-lg">{totalVote}</p>
      <Button onClick={() => onDownvote(id)} className="hover:opacity-70">
        <FaChevronDown
          className={`text-2xl ${userDownVote ? 'text-primary' : ''}`}
          title="Downvote Thread"
        />
      </Button>
    </div>
  );
}

VoteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  totalVote: PropTypes.number.isRequired,
  userUpVote: PropTypes.bool.isRequired,
  userDownVote: PropTypes.bool.isRequired,
};

export default VoteButton;
