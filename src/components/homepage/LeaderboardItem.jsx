import PropTypes from 'prop-types';
import React from 'react';

function LeaderboardItem({ leaderboard }) {
  const { user, score } = leaderboard;

  return (
    <div key={user.id} className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={user.avatar} alt="profile" className="w-8 rounded-full" />
        <div className="flex flex-col">
          <p className="font-sm font-semibold">{user.name}</p>
        </div>
      </div>
      <p className="mt-2 font-semibold">{score} points</p>
    </div>
  );
}

LeaderboardItem.propTypes = {
  leaderboard: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
    score: PropTypes.number.isRequired,
  }),
};

export default LeaderboardItem;
