import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.CREATE_THREAD:
      return [...threads, action.payload.thread];
    case ActionType.UPVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy:
              !thread.upVotesBy.includes(action.payload.userId) &&
              thread.upVotesBy.concat([action.payload.userId]),
          };
        }
      });
    case ActionType.DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy:
              !thread.downVotesBy.includes(action.payload.userId) &&
              thread.downVotesBy.concat([action.payload.userId]),
          };
        }
      });
    case ActionType.NEUTRALIZE_THREAD_VOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy:
              thread.upVotesBy.includes(action.payload.userId) &&
              thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy:
              thread.downVotesBy.includes(action.payload.userId) &&
              thread.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
      });
    default:
      return threads;
  }
}

export default threadsReducer;
