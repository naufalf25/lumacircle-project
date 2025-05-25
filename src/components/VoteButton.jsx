import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function VoteButton({
  id,
  onUpvote,
  onDownvote,
  totalVote = 0,
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
  /** The ID of target thread or comment */
  id: PropTypes.string.isRequired,
  /** The up vote function handler */
  onUpvote: PropTypes.func.isRequired,
  /** The down vote function handler */
  onDownvote: PropTypes.func.isRequired,
  /** The total of vote from target thread or comment */
  totalVote: PropTypes.number.isRequired,
  /** The current status of user up vote or not */
  userUpVote: PropTypes.bool.isRequired,
  /** The current status of user down vote or not */
  userDownVote: PropTypes.bool.isRequired,
};

export default VoteButton;
