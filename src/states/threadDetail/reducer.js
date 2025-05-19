import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.UPVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy:
          !threadDetail.upVotesBy.includes(action.payload.userId) &&
          threadDetail.upVotesBy.concat([action.payload.userId]),
      };
    case ActionType.DOWNVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        downVotesBy:
          !threadDetail.downVotesBy.includes(action.payload.userId) &&
          threadDetail.downVotesBy.concat([action.payload.userId]),
      };
    case ActionType.NEUTRALIZE_THREAD_DETAIL_VOTE:
      return {
        ...threadDetail,
        upVotesBy:
          threadDetail.upVotesBy.includes(action.payload.userId) &&
          threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
        downVotesBy:
          threadDetail.downVotesBy.includes(action.payload.userId) &&
          threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
