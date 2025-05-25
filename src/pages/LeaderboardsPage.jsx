import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import LeaderboardItem from '../components/homepage/LeaderboardItem';
import { useDispatch } from 'react-redux';
import { asyncPopulateLeaderboards } from '../states/shared/action';
import { motion } from 'motion/react';

function LeaderboardsPage() {
  const { leaderboards = [] } = useSelector((states) => states);
  const [isWaiting, setIsWaiting] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());

    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const leaderboardMotionContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const leaderboardMotionItem = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="font-poppins flex min-h-[92.8vh] items-start justify-center bg-[#F5EEDC] px-4 py-20 lg:p-20">
      <div className="w-full rounded-lg bg-white p-4 shadow-md md:p-6 lg:p-10">
        <h2 className="text-center text-lg font-semibold md:text-xl lg:text-2xl">
          Leaderboards
        </h2>
        <div className="mt-10">
          {isWaiting && leaderboards.length === 0 && <Loading />}
          {!isWaiting && leaderboards.length === 0 && (
            <div className="w-full rounded-xl bg-white p-4 shadow-lg md:p-6">
              <p className="text-center text-xl font-semibold">
                Leaderboards data not available!
              </p>
            </div>
          )}
          <motion.div
            initial="hidden"
            animate="show"
            variants={leaderboardMotionContainer}
            className="flex flex-col gap-4"
          >
            {leaderboards.map((leaderboard) => (
              <motion.div
                key={leaderboard.user.id}
                variants={leaderboardMotionItem}
              >
                <LeaderboardItem leaderboard={leaderboard} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LeaderboardsPage;
