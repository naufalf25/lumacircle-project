import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import ThreadInput from './ThreadInput';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    render(<ThreadInput createThreadHandler={() => {}} />);
    const titleInput = screen.getByPlaceholderText('Your thread title here');

    // Action
    await userEvent.type(titleInput, 'title test');

    // Assert
    expect(titleInput).toHaveValue('title test');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    render(<ThreadInput createThreadHandler={() => {}} />);
    const bodyInput = screen.getByPlaceholderText(
      'What you think to write about this thread.....',
    );

    // Action
    await userEvent.type(bodyInput, 'body test');

    // Assert
    expect(bodyInput.innerHTML).toBe('body test');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<ThreadInput createThreadHandler={() => {}} />);
    const categoryInput = screen.getByPlaceholderText(
      'Your thread category here',
    );

    // Action
    await userEvent.type(categoryInput, 'categorytest');

    // Assert
    expect(categoryInput).toHaveValue('categorytest');
  });

  it('should call create thread function when Create New Thread button is clicked', async () => {
    // Arrange
    const mockCreateThreadHandler = vi.fn();
    render(<ThreadInput createThreadHandler={mockCreateThreadHandler} />);

    const titleInput = screen.getByPlaceholderText('Your thread title here');
    await userEvent.type(titleInput, 'title test');

    const bodyInput = screen.getByPlaceholderText(
      'What you think to write about this thread.....',
    );
    await userEvent.type(bodyInput, 'body test');

    const categoryInput = screen.getByPlaceholderText(
      'Your thread category here',
    );
    await userEvent.type(categoryInput, 'categorytest');

    const submitNewThreadButton = screen.getByRole('button', {
      type: 'submit',
    });

    // Action
    // await userEvent.click(submitNewThreadButton);
    fireEvent.submit(submitNewThreadButton);

    // Assert
    expect(mockCreateThreadHandler).toBeCalledTimes(1);
    expect(mockCreateThreadHandler).toBeCalledWith({
      event: expect.any(Object),
      title: 'title test',
      body: 'body test',
      category: 'categorytest',
    });
  });
});
