/**
 * test scenarios
 *
 * - asyncReceiveThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and alert correctly when data fetching failed
 * - asyncUpvoteThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and alert correctly when data fetching failed
 * - asyncDownvoteThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and alert correctly when data fetching failed
 * - asyncNeutralizeThreadDetailVote thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and alert correctly when data fetching failed
 * - asyncCreateComment thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and alert correctly when data fetching failed
 * - asyncUpvoteComment thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and alert correctly when data fetching failed
 * - asyncDownvoteComment thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and alert correctly when data fetching failed
 * - asyncNeutralizeCommentVote thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and alert correctly when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import {
  asyncCreateComment,
  asyncDownvoteComment,
  asyncDownvoteThreadDetail,
  asyncNeutralizeCommentVote,
  asyncNeutralizeThreadDetailVote,
  asyncReceiveThreadDetail,
  asyncUpvoteComment,
  asyncUpvoteThreadDetail,
  clearThreadDetailActionCreator,
  createCommentActionCreator,
  downvoteCommentActionCreator,
  downvoteThreadDetailActionCreator,
  neutralizeCommentVoteActionCreator,
  neutralizeThreadDetailVoteActionCreator,
  receiveThreadDetalActionCreator,
  upvoteCommentActionCreator,
  upvoteThreadDetailActionCreator,
} from './action';
import { hideLoading, showLoading } from '../loading/action';

const fakeThreadDetailResponse = {
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

const fakeUpVoteResponse = {
  id: 'vote-1',
  userId: 'users-1',
  threadId: 'thread-1',
  voteType: 1,
};

const fakeDownVoteResponse = {
  id: 'vote-1',
  userId: 'users-1',
  threadId: 'thread-1',
  voteType: -1,
};

const fakeNeutralVoteResponse = {
  id: 'vote-1',
  userId: 'users-1',
  threadId: 'thread-1',
  voteType: 0,
};

const fakeGetState = {
  authUser: { id: 'users-1' },
  threadDetail: { id: 'thread-1' },
};

const mockCreateCommentResponse = {
  id: 'comment-1',
  content: 'Ini adalah komentar pertama',
  createdAt: '2021-06-21T07:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  owner: {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com',
  },
};

const mockUpvoteCommentResponse = {
  id: 'vote-1',
  userId: 'users-1',
  commentId: 'comment-1',
  voteType: 1,
};

const mockDownvoteCommentResponse = {
  id: 'vote-1',
  userId: 'users-1',
  commentId: 'comment-1',
  voteType: -1,
};

const mockNeutralCommentResponse = {
  id: 'vote-1',
  userId: 'users-1',
  commentId: 'comment-1',
  voteType: 0,
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncReceiveThreadDetail thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'getThreadDetail');
  });

  afterEach(() => {
    api.getThreadDetail.mockRestore();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    // stub implementation
    api.getThreadDetail.mockResolvedValue(fakeThreadDetailResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncReceiveThreadDetail(fakeThreadDetailResponse.id)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetalActionCreator(fakeThreadDetailResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and alert correctly when data fetching failed', async () => {
    // Arrange
    // stub implementation
    api.getThreadDetail.mockRejectedValue(fakeErrorResponse);

    // mock dispatch and alert
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // Action
    await asyncReceiveThreadDetail(fakeThreadDetailResponse.id)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUpvoteThreadDetail thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'upvoteThread');
  });

  afterEach(() => {
    api.upvoteThread.mockRestore();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    // stub implementation
    api.upvoteThread.mockResolvedValue(fakeUpVoteResponse);

    // mock dispatch and getState
    const dispatch = vi.fn();
    const getState = vi.fn(() => fakeGetState);

    // Action
    await asyncUpvoteThreadDetail()(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      upvoteThreadDetailActionCreator(fakeUpVoteResponse.userId),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and alert correctly when data fetching failed', async () => {
    // Arrange
    // stub implementation
    api.upvoteThread.mockRejectedValue(fakeErrorResponse);

    // mock dispatch, getState, and alert
    const dispatch = vi.fn();
    const getState = vi.fn(() => fakeGetState);
    window.alert = vi.fn();

    // Action
    await asyncUpvoteThreadDetail()(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncDownvoteThreadDetail thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'downvoteThread');
  });

  afterEach(() => {
    api.downvoteThread.mockRestore();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    // stub implementation
    api.downvoteThread.mockResolvedValue(fakeDownVoteResponse);

    // mock dispatch and getState
    const dispatch = vi.fn();
    const getState = vi.fn(() => fakeGetState);

    // Action
    await asyncDownvoteThreadDetail()(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      downvoteThreadDetailActionCreator(fakeDownVoteResponse.userId),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and alert correctly when data fetching failed', async () => {
    // Arrange
    // stub implementation
    api.downvoteThread.mockRejectedValue(fakeErrorResponse);

    // mock dispatch, getState, and alert
    const dispatch = vi.fn();
    const getState = vi.fn(() => fakeGetState);
    window.alert = vi.fn();

    // Action
    await asyncDownvoteThreadDetail()(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncNeutralizeThreadDetailVote thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'neutralizeThreadVote');
  });

  afterEach(() => {
    api.neutralizeThreadVote.mockRestore();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    // stub implementation
    api.neutralizeThreadVote.mockResolvedValue(fakeNeutralVoteResponse);

    // mock dispatch and getState
    const dispatch = vi.fn();
    const getState = vi.fn(() => fakeGetState);

    // Action
    await asyncNeutralizeThreadDetailVote()(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      neutralizeThreadDetailVoteActionCreator(fakeDownVoteResponse.userId),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and alert correctly when data fetching failed', async () => {
    // Arrange
    // stub implementation
    api.neutralizeThreadVote.mockRejectedValue(fakeErrorResponse);

    // mock dispatch, getState, and alert
    const dispatch = vi.fn();
    const getState = vi.fn(() => fakeGetState);
    window.alert = vi.fn();

    // Action
    await asyncNeutralizeThreadDetailVote()(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncCreateComment thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'createComment');
  });

  afterEach(() => {
    api.createComment.mockRestore();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    // stub implementation
    api.createComment.mockResolvedValue(mockCreateCommentResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncCreateComment({
      content: mockCreateCommentResponse.id,
      threadId: fakeThreadDetailResponse.id,
    })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      createCommentActionCreator(mockCreateCommentResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and alert correctly when data fetching failed', async () => {
    // Arrange
    // stub implementation
    api.createComment.mockRejectedValue(fakeErrorResponse);

    // mock dispatch and alert
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // Action
    await asyncCreateComment({
      content: mockCreateCommentResponse.id,
      threadId: fakeThreadDetailResponse.id,
    })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUpvoteComment thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'upvoteComment');
  });

  afterEach(() => {
    api.upvoteComment.mockRestore();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    // stub implementation
    api.upvoteComment.mockResolvedValue(mockUpvoteCommentResponse);

    // mock dispatch and getState
    const dispatch = vi.fn();
    const getState = vi.fn(() => fakeGetState);

    // Action
    await asyncUpvoteComment(mockUpvoteCommentResponse.commentId)(
      dispatch,
      getState,
    );

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      upvoteCommentActionCreator({
        commentId: mockUpvoteCommentResponse.commentId,
        userId: fakeGetState.authUser.id,
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and alert correctly when data fetching failed', async () => {
    // Arrange
    // stub implementation
    api.upvoteComment.mockRejectedValue(fakeErrorResponse);

    // mock dispatch, getState, and alert
    const dispatch = vi.fn();
    const getState = vi.fn(() => fakeGetState);
    window.alert = vi.fn();

    // Action
    await asyncUpvoteComment(mockUpvoteCommentResponse.commentId)(
      dispatch,
      getState,
    );

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncDownvoteComment thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'downvoteComment');
  });

  afterEach(() => {
    api.downvoteComment.mockRestore();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    // stub implementation
    api.downvoteComment.mockResolvedValue(mockDownvoteCommentResponse);

    // mock dispatch and getState
    const dispatch = vi.fn();
    const getState = vi.fn(() => fakeGetState);

    // Action
    await asyncDownvoteComment(mockDownvoteCommentResponse.commentId)(
      dispatch,
      getState,
    );

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      downvoteCommentActionCreator({
        commentId: mockDownvoteCommentResponse.commentId,
        userId: fakeGetState.authUser.id,
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and alert correctly when data fetching failed', async () => {
    // Arrange
    // stub implementation
    api.downvoteComment.mockRejectedValue(fakeErrorResponse);

    // mock dispatch, getState, and alert
    const dispatch = vi.fn();
    const getState = vi.fn(() => fakeGetState);
    window.alert = vi.fn();

    // Action
    await asyncDownvoteComment(mockDownvoteCommentResponse.commentId)(
      dispatch,
      getState,
    );

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncNeutralizeCommentVote thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'neutralizeCommentVote');
  });

  afterEach(() => {
    api.neutralizeCommentVote.mockRestore();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    // stub implementation
    api.neutralizeCommentVote.mockResolvedValue(mockNeutralCommentResponse);

    // mock dispatch and getState
    const dispatch = vi.fn();
    const getState = vi.fn(() => fakeGetState);

    // Action
    await asyncNeutralizeCommentVote(mockNeutralCommentResponse.commentId)(
      dispatch,
      getState,
    );

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      neutralizeCommentVoteActionCreator({
        commentId: mockNeutralCommentResponse.commentId,
        userId: fakeGetState.authUser.id,
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and alert correctly when data fetching failed', async () => {
    // Arrange
    // stub implementation
    api.neutralizeCommentVote.mockRejectedValue(fakeErrorResponse);

    // mock dispatch, getState, and alert
    const dispatch = vi.fn();
    const getState = vi.fn(() => fakeGetState);
    window.alert = vi.fn();

    // Action
    await asyncNeutralizeCommentVote(mockNeutralCommentResponse.commentId)(
      dispatch,
      getState,
    );

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
