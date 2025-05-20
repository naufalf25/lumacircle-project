import React, { useState } from 'react';
import ThreadLists from '../components/homepage/ThreadLists';
import SidePanelLists from '../components/homepage/SidePanelLists';
import { useDispatch, useSelector } from 'react-redux';
import CreateThread from '../components/homepage/CreateThread';
import { useEffect } from 'react';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
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
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onCreateThread = ({ title, body, category }) => {
    if (!authUser) {
      alert('You must login to create a thread');

      return;
    }

    setLoading(true);

    dispatch(asyncCreateThread({ title, body, category }));

    alert('Thread created successfully!');

    setLoading(false);
  };

  const onUpvote = (id) => {
    if (!authUser) {
      alert('You must login to upvote a thread');

      return;
    }

    setLoading(true);

    const targetThread = threads.find((thread) => thread.id === id);

    if (targetThread.upVotesBy.includes(authUser.id)) {
      setLoading(false);
      alert('You have already upvoted this thread');

      return;
    }

    if (targetThread.downVotesBy.includes(authUser.id)) {
      dispatch(asyncNeutralizeThreadVote(id));
      setLoading(false);

      return;
    }

    dispatch(asyncUpvoteThread(id));
    setLoading(false);
  };

  const onDownvote = (id) => {
    if (!authUser) {
      alert('You must login to downvote a thread');

      return;
    }

    setLoading(true);

    const targetThread = threads.find((thread) => thread.id === id);

    if (targetThread.upVotesBy.includes(authUser.id)) {
      dispatch(asyncNeutralizeThreadVote(id));
      setLoading(false);

      return;
    }

    if (targetThread.downVotesBy.includes(authUser.id)) {
      setLoading(false);
      alert('You have already downvoted this thread');

      return;
    }

    dispatch(asyncDownvoteThread(id));
    setLoading(false);
  };

  const threadLists = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id,
  }));

  return (
    <section className="font-poppins flex min-h-[92.8vh] gap-10 bg-[#F5EEDC] p-4 lg:p-20">
      {loading && (
        <div className="absolute top-10 right-10">
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
