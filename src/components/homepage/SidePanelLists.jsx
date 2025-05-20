import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LeaderboardItem from './LeaderboardItem';
import Loading from '../Loading';

function SidePanelLists({ leaderboards }) {
  return (
    <section className="hidden md:block md:w-1/3">
      <div className="sticky top-10 flex flex-col gap-4">
        <div className="rounded-xl bg-white p-4 shadow-lg">
          <h2 className="text-center font-semibold md:text-xl">Leaderboards</h2>
          <div className="mt-10 flex flex-col gap-4">
            {leaderboards.length === 0 && <Loading />}
            {leaderboards.slice(0, 15).map((leaderboard) => (
              <LeaderboardItem
                key={leaderboard.user.id}
                leaderboard={leaderboard}
              />
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center">
            <Link
              to="/leaderboards"
              className="text-primary hover:text-secondary text-lg font-semibold"
            >
              See All Leaderboards
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

SidePanelLists.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
      score: PropTypes.number.isRequired,
    }),
  ),
};

export default SidePanelLists;
