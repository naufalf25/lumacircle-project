import { describe, expect, it } from 'vitest';
import threadDetailReducer from './reducer';

describe('ThreadDetailReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    // Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread detail when given by RECEIVE_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = null;
    const action = {
      type: 'threadDetail/receive',
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = null;
    const action = {
      type: 'threadDetail/clear',
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(null);
  });

  it('should return the threadDetail with the up vote thread when given by UPVOTE_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: 'threadDetail/upVote',
      payload: {
        userId: 'users-2',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
    });
  });

  it('should return the threadDetail with the down vote thread when given by DOWNVOTE_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: 'threadDetail/downVote',
      payload: {
        userId: 'users-2',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [action.payload.userId],
    });
  });

  it('should return the initial state if userId not found when given by NEUTRALIZE_THREAD_DETAIL_VOTE action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-2'],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: 'threadDetail/neutralizeVote',
      payload: {
        userId: 'users-x',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threadDetail with the neutralize thread vote from up vote when given by NEUTRALIZE_THREAD_DETAIL_VOTE action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-2'],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: 'threadDetail/neutralizeVote',
      payload: {
        userId: 'users-2',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
    });
  });

  it('should return the threadDetail with the neutralize thread vote from down vote when given by NEUTRALIZE_THREAD_DETAIL_VOTE action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: ['users-2'],
      comments: [],
    };
    const action = {
      type: 'threadDetail/neutralizeVote',
      payload: {
        userId: 'users-2',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [],
    });
  });

  it('should return the threadDetail with the new comment when given by CREATE_COMMENT action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: 'threadDetail/comment/create',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment],
    });
  });

  it('should return the initial state if commentId not found when given by UPVOTE_COMMENT, DOWNVOTE_COMMENT, and NEUTRALIZE_COMMENT_VOTE action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const upVoteAction = {
      type: 'threadDetail/comment/upVote',
      payload: {
        commentId: 'comment-x',
        userId: 'users-2',
      },
    };
    const downVoteAction = {
      type: 'threadDetail/comment/downVote',
      payload: {
        commentId: 'comment-x',
        userId: 'users-2',
      },
    };
    const neutralizeVoteAction = {
      type: 'threadDetail/comment/neutralizeVote',
      payload: {
        commentId: 'comment-x',
        userId: 'users-2',
      },
    };

    // Action
    const upVoteNextState = threadDetailReducer(initialState, upVoteAction);
    const downVoteNextState = threadDetailReducer(initialState, downVoteAction);
    const neutralizeVoteNextState = threadDetailReducer(
      initialState,
      neutralizeVoteAction,
    );

    // Assert
    expect(upVoteNextState).toEqual(initialState);
    expect(downVoteNextState).toEqual(initialState);
    expect(neutralizeVoteNextState).toEqual(initialState);
  });

  it('should return the threadDetail with the up vote comment when given by UPVOTE_COMMENT action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'threadDetail/comment/upVote',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [action.payload.userId],
        },
      ],
    });
  });

  it('should return the threadDetail with the down vote comment when given by DOWNVOTE_COMMENT action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'threadDetail/comment/downVote',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          downVotesBy: [action.payload.userId],
        },
      ],
    });
  });

  it('should return the initial state if userId not found when given by NEUTRALIZE_COMMENT_VOTE action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-2'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'threadDetail/comment/neutralizeVote',
      payload: {
        commentId: 'comment-1',
        userId: 'users-x',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threadDetail with the neutralize comment vote from up vote comment when given by NEUTRALIZE_COMMENT_VOTE action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-2'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'threadDetail/comment/neutralizeVote',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
        },
      ],
    });
  });

  it('should return the threadDetail with the neutralize comment vote from down vote comment when given by NEUTRALIZE_COMMENT_VOTE action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: ['users-2'],
        },
      ],
    };
    const action = {
      type: 'threadDetail/comment/neutralizeVote',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          downVotesBy: [],
        },
      ],
    });
  });
});
