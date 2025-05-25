import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LeaderboardItem from './LeaderboardItem';
import Loading from '../Loading';
import { motion } from 'motion/react';

function SidePanelLists({ leaderboards }) {
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hidden md:block md:w-1/3">
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <div className="sticky top-10 flex flex-col gap-4">
          <div className="rounded-xl bg-white p-4 shadow-lg">
            <h2 className="text-center font-semibold md:text-xl">
              Leaderboards
            </h2>
            <div className="mt-10 flex flex-col gap-4">
              {isWaiting && leaderboards.length === 0 && <Loading />}
              {!isWaiting && leaderboards.length === 0 && (
                <div className="w-full rounded-xl bg-white p-4 shadow-lg md:p-6">
                  <p className="text-center text-xl font-semibold">
                    Leaderboards data not available!
                  </p>
                </div>
              )}
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
      </motion.div>
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
