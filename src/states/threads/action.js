import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRALIZE_THREAD_VOTE: 'NEUTRALIZE_THREAD_VOTE',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function createThreadActionCreator(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    },
  };
}

function upvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeThreadVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_VOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(createThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upvoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.upvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(upvoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downvoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.downvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downvoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncNeutralizeThreadVote(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id }),
    );

    try {
      await api.neutralizeThreadVote(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id }),
      );
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  createThreadActionCreator,
  upvoteThreadActionCreator,
  neutralizeThreadVoteActionCreator,
  downvoteThreadActionCreator,
  asyncCreateThread,
  asyncUpvoteThread,
  asyncNeutralizeThreadVote,
  asyncDownvoteThread,
};
