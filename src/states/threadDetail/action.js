import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  UPVOTE_THREAD_DETAIL: 'UPVOTE_THREAD_DETAIL',
  DOWNVOTE_THREAD_DETAIL: 'DOWNVOTE_THREAD_DETAIL',
  NEUTRALIZE_THREAD_DETAIL_VOTE: 'NEUTRALIZE_THREAD_DETAIL_VOTE',
};

function receiveThreadDetalActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function upvoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UPVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downvoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWNVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralizeThreadDetailVoteActionCreator(userId) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_DETAIL_VOTE,
    paylaod: {
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetalActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUpvoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(upvoteThreadDetailActionCreator(authUser.id));

    try {
      await api.upvoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncDownvoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(downvoteThreadDetailActionCreator(authUser.id));

    try {
      await api.downvoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncNeutralizeThreadDetailVote() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(neutralizeThreadDetailVoteActionCreator(authUser.id));

    try {
      await api.neutralizeThreadVote(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadDetalActionCreator,
  clearThreadDetailActionCreator,
  upvoteThreadDetailActionCreator,
  downvoteThreadDetailActionCreator,
  neutralizeThreadDetailVoteActionCreator,
  asyncReceiveThreadDetail,
  asyncUpvoteThreadDetail,
  asyncDownvoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
};
