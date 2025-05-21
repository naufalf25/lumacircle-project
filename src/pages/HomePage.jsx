import React, { useEffect } from 'react';
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

function HomePage() {
  const {
    threads = [],
    users = [],
    leaderboards = [],
    authUser,
    loading,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

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

  return (
    <section className="font-poppins flex min-h-[92.8vh] gap-10 bg-[#F5EEDC] px-4 py-20 lg:p-20">
      {loading && (
        <div className="fixed top-10 right-10 z-10">
          <Loading />
        </div>
      )}
      <div className="flex w-full flex-col gap-10 md:w-2/3">
        <CreateThread onCreateThread={onCreateThread} authUser={authUser} />
        <ThreadLists
          threads={threadLists}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
        />
      </div>
      <SidePanelLists leaderboards={leaderboards} />
    </section>
  );
}

export default HomePage;
