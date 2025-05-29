/**
 * test scenarios for CommentInput
 *
 * - CommentInput component
 *  - should handle content typing correctly
 *  - should call create new comment function when Submit Comment button is clicked
 */

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CommentInput from './CommentInput';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle content typing correctly', async () => {
    // Arrange
    render(<CommentInput createCommentHandler={() => {}} />);
    const contentInput = screen.getByPlaceholderText(
      'Add your comment to this thread here...',
    );

    // Action
    await userEvent.type(contentInput, 'content test');

    // Assert
    expect(contentInput).toHaveValue('content test');
  });

  it('should call create new comment function when Submit Comment button is clicked', async () => {
    // Arrange
    const mockCreateCommentHandler = vi.fn();
    render(<CommentInput createCommentHandler={mockCreateCommentHandler} />);

    const contentInput = screen.getByPlaceholderText(
      'Add your comment to this thread here...',
    );
    await userEvent.type(contentInput, 'content test');

    const submitCommentButton = screen.getByRole('button', { type: 'submit' });

    // Action
    // await userEvent.click(submitCommentButton);
    fireEvent.submit(submitCommentButton);

    // Assert
    expect(mockCreateCommentHandler).toBeCalledWith({
      event: expect.any(Object),
      content: 'content test',
    });
  });
});
