import React, { useEffect, useState } from 'react';
import ThreadLists from '../components/homepage/ThreadLists';
import SidePanelLists from '../components/homepage/SidePanelLists';
import { useDispatch, useSelector } from 'react-redux';
import CreateThread from '../components/homepage/CreateThread';
import {
  asyncPopulateLeaderboards,
  asyncPopulateUsersAndThreads,
} from '../states/shared/action';
import {
  asyncCreateThread,
  asyncDownvoteThread,
  asyncNeutralizeThreadVote,
  asyncUpvoteThread,
} from '../states/threads/action';
import Loading from '../components/Loading';
import CategoryLists from '../components/homepage/CategoryLists';
import { motion } from 'motion/react';

function HomePage() {
  const {
    threads = [],
    users = [],
    leaderboards = [],
    authUser,
    loading,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  const onCreateThread = ({ title, body, category }) => {
    if (!authUser) {
      alert('You must login to create a thread');
      return;
    }

    dispatch(asyncCreateThread({ title, body, category }));
  };

  const onUpvote = (id) => {
    if (!authUser) {
      alert('You must login to upvote a thread');
      return;
    }

    const targetThread = threads.find((thread) => thread.id === id);

    if (targetThread.upVotesBy.includes(authUser.id)) {
      alert('You have already upvoted this thread');
      return;
    }

    if (targetThread.downVotesBy.includes(authUser.id)) {
      dispatch(asyncNeutralizeThreadVote(id));

      return;
    }

    dispatch(asyncUpvoteThread(id));
  };

  const onDownvote = (id) => {
    if (!authUser) {
      alert('You must login to downvote a thread');
      return;
    }

    const targetThread = threads.find((thread) => thread.id === id);

    if (targetThread.upVotesBy.includes(authUser.id)) {
      dispatch(asyncNeutralizeThreadVote(id));
      return;
    }

    if (targetThread.downVotesBy.includes(authUser.id)) {
      alert('You have already downvoted this thread');
      return;
    }

    dispatch(asyncDownvoteThread(id));
  };

  const threadLists = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id,
  }));

  const threadsByCategory = threadLists.filter((thread) =>
    thread.category.includes(category),
  );

  const filterThreadsHandler = ({ event, targetCategory }) => {
    event.preventDefault();

    if (targetCategory === category) {
      setCategory('');
    } else {
      setCategory(targetCategory);
    }
  };

  return (
    <section className="font-poppins flex min-h-[92.8vh] gap-10 bg-[#F5EEDC] px-4 py-20 lg:p-20">
      {loading && (
        <div className="fixed top-10 right-10 z-10">
          <Loading />
        </div>
      )}
      <div className="flex w-full flex-col gap-10 md:w-2/3">
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          <CreateThread onCreateThread={onCreateThread} authUser={authUser} />
        </motion.div>
        {threads.length !== 0 && (
          <motion.div
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 50 }}
          >
            <CategoryLists
              categoryState={category}
              threads={threads}
              filterThreadsHandler={filterThreadsHandler}
            />
          </motion.div>
        )}
        <ThreadLists
          threads={threadsByCategory}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
        />
      </div>
      <SidePanelLists leaderboards={leaderboards} />
    </section>
  );
}

export default HomePage;
