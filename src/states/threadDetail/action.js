import api from '../../utils/api';
import { hideLoading, showLoading } from '../loading/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'threadDetail/receive',
  CLEAR_THREAD_DETAIL: 'threadDetail/clear',
  UPVOTE_THREAD_DETAIL: 'threadDetail/upVote',
  DOWNVOTE_THREAD_DETAIL: 'threadDetail/downVote',
  NEUTRALIZE_THREAD_DETAIL_VOTE: 'threadDetail/neutralizeVote',
  CREATE_COMMENT: 'threadDetail/comment/create',
  UPVOTE_COMMENT: 'threadDetail/comment/upVote',
  DOWNVOTE_COMMENT: 'threadDetail/comment/downVote',
  NEUTRALIZE_COMMENT_VOTE: 'threadDetail/comment/neutralizeVote',
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
    payload: {
      userId,
    },
  };
}

function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

function upvoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downvoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeCommentVoteActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_COMMENT_VOTE,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetalActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpvoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    dispatch(upvoteThreadDetailActionCreator(authUser.id));

    try {
      await api.upvoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncDownvoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    dispatch(downvoteThreadDetailActionCreator(authUser.id));

    try {
      await api.downvoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeThreadDetailVote() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    dispatch(neutralizeThreadDetailVoteActionCreator(authUser.id));

    try {
      await api.neutralizeThreadVote(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncCreateComment({ content, threadId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ content, threadId });
      dispatch(createCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpvoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { threadDetail, authUser } = getState();
    dispatch(
      upvoteCommentActionCreator({
        commentId,
        userId: authUser.id,
      }),
    );

    try {
      await api.upvoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(
        upvoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncDownvoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { threadDetail, authUser } = getState();
    dispatch(
      downvoteCommentActionCreator({
        commentId,
        userId: authUser.id,
      }),
    );

    try {
      await api.downvoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(
        downvoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeCommentVote(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { threadDetail, authUser } = getState();
    dispatch(
      neutralizeCommentVoteActionCreator({
        commentId,
        userId: authUser.id,
      }),
    );

    try {
      await api.neutralizeCommentVote({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeCommentVoteActionCreator({
          commentId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetalActionCreator,
  clearThreadDetailActionCreator,
  upvoteThreadDetailActionCreator,
  downvoteThreadDetailActionCreator,
  neutralizeThreadDetailVoteActionCreator,
  createCommentActionCreator,
  upvoteCommentActionCreator,
  downvoteCommentActionCreator,
  neutralizeCommentVoteActionCreator,
  asyncReceiveThreadDetail,
  asyncUpvoteThreadDetail,
  asyncDownvoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
  asyncCreateComment,
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralizeCommentVote,
};
