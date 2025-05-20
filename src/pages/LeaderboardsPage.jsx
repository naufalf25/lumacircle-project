import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import LeaderboardItem from '../components/homepage/LeaderboardItem';

function LeaderboardsPage() {
  const { leaderboards = [] } = useSelector((states) => states);

  return (
    <section className="font-poppins flex min-h-[92.8vh] items-start justify-center bg-[#F5EEDC] p-4 lg:p-20">
      <div className="w-full rounded-lg bg-white p-4 shadow-md md:p-6 lg:p-10">
        <h2 className="text-center text-lg font-semibold md:text-xl lg:text-2xl">
          Leaderboards
        </h2>
        <div className="mt-10 flex flex-col gap-4">
          {leaderboards.length === 0 && <Loading />}
          {leaderboards.map((leaderboard) => (
            <LeaderboardItem
              key={leaderboard.user.id}
              leaderboard={leaderboard}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeaderboardsPage;
