import api from '../../utils/api';

const ActionType = {
  CREATE_COMMENT: 'CREATE_COMMENT',
  UPVOTE_COMMENT: 'UPVOTE_COMMENT',
  DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT',
  NEUTRALIZE_COMMENT_VOTE: 'NEUTRALIZE_COMMENT_VOTE',
};

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
    paylaod: {
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

function asyncCreateComment({ content, threadId }) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ content, threadId });
      dispatch(createCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUpvoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upvoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.upvoteComment(commentId);
    } catch (error) {
      alert(error.message);
      dispatch(upvoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncDownvoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downvoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.downvoteComment(commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        downvoteCommentActionCreator({ commentId, userId: authUser.id }),
      );
    }
  };
}

function asyncNeutralizeCommentVote(commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      neutralizeCommentVoteActionCreator({ commentId, userId: authUser.id }),
    );

    try {
      await api.neutralizeCommentVote(commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeCommentVoteActionCreator({ commentId, userId: authUser.id }),
      );
    }
  };
}

export {
  ActionType,
  createCommentActionCreator,
  upvoteCommentActionCreator,
  downvoteCommentActionCreator,
  neutralizeCommentVoteActionCreator,
  asyncCreateComment,
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralizeCommentVote,
};
