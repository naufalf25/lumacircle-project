import { ActionType } from './action';

function commentsReducer(comments = [], action = {}) {
  switch (action.type) {
    case ActionType.CREATE_COMMENT:
      return [...comments, action.payload.comment];
    case ActionType.UPVOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy:
              !comment.upVotesBy.includes(action.payload.userId) &&
              comment.upVotesBy.concat([action.payload.userId]),
          };
        }
      });
    case ActionType.DOWNVOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            downVotesBy:
              !comment.downVotesBy.includes(action.payload.userId) &&
              comment.downVotesBy.concat([action.payload.userId]),
          };
        }
      });
    case ActionType.NEUTRALIZE_COMMENT_VOTE:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy:
              comment.upVotesBy.includes(action.payload.userId) &&
              comment.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy:
              comment.downVotesBy.includes(action.payload.userId) &&
              comment.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
      });
    default:
      return comments;
  }
}

export default commentsReducer;
