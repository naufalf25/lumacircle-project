import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    // Arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // Arrange
    const initialState = [];
    const action = {
      type: 'threads/receive',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by CREATE_THREAD action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'threads/create',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([...initialState, action.payload.thread]);
  });

  it('should return the initial state if threadId not found when given by UPVOTE_THREAD, DOWNVOTE_THREAD, and NEUTRALIZE_THREAD_VOTE action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const upVoteAction = {
      type: 'threads/upVote',
      payload: {
        threadId: 'thread-x',
        userId: 'users-2',
      },
    };
    const downVoteAction = {
      type: 'threads/downVote',
      payload: {
        threadId: 'thread-x',
        userId: 'users-2',
      },
    };
    const neutralizeVoteAction = {
      type: 'threads/neutralizeVote',
      payload: {
        threadId: 'thread-x',
        userId: 'users-2',
      },
    };

    // Action
    const upVoteNextState = threadsReducer(initialState, upVoteAction);
    const downVoteNextState = threadsReducer(initialState, downVoteAction);
    const neutralizeVoteNextState = threadsReducer(
      initialState,
      neutralizeVoteAction,
    );

    // Assert
    expect(upVoteNextState).toEqual(initialState);
    expect(downVoteNextState).toEqual(initialState);
    expect(neutralizeVoteNextState).toEqual(initialState);
  });

  it('should return the threads with the up vote thread when given by UPVOTE_THREAD action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'threads/upVote',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);
  });

  it('should return the threads with the down vote thread when given by DOWNVOTE_THREAD action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'threads/downVote',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      },
    ]);
  });

  it('should return the initial state if userId not found when given by NEUTRALIZE_THREAD_VOTE action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-2'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'threads/neutralizeVote',
      payload: {
        threadId: 'thread-1',
        userId: 'users-x',
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads with the neutralize vote from up vote thread when given by NEUTRALIZE_THREAD_VOTE action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-2'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'threads/neutralizeVote',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
      },
    ]);
  });

  it('should return the threads with the neutralize vote from down vote thread when given by NEUTRALIZE_THREAD_VOTE action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['users-2'],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'threads/neutralizeVote',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [],
      },
    ]);
  });
});
