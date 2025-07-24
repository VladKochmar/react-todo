import type Task from '../types/Task';
import TaskEditForm from './TaskEditForm';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const mockTask: Task = {
  id: 1,
  title: 'Test Task',
  done: false,
  deadline: '',
  description: 'Initial description',
};

describe('TaskEditForm', () => {
  it('renders props values', () => {
    render(<TaskEditForm task={mockTask} onEdit={() => {}} />);

    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Initial description')).toBeInTheDocument();
  });

  it("doesn't call onEdit if title is empty", async () => {
    const onEdit = vi.fn();
    render(<TaskEditForm task={mockTask} onEdit={onEdit} />);

    const input = screen.getByTestId('task-name-input');
    const editButton = screen.getByText('Save');

    await userEvent.clear(input);
    await userEvent.click(editButton);

    expect(onEdit).not.toHaveBeenCalled();
    expect(screen.getByText('Title is required')).toBeInTheDocument();
  });

  it('calls onEdit if it has new data', async () => {
    const onEdit = vi.fn();
    render(<TaskEditForm task={mockTask} onEdit={onEdit} />);

    const taskNameInput = screen.getByTestId('task-name-input');
    await userEvent.clear(taskNameInput);
    await userEvent.type(taskNameInput, 'Updated Task');

    const descriptionInput = screen.getByTestId('description-input');
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'Updated task description');

    const editButton = screen.getByText('Save');
    await userEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledWith({
      ...mockTask,
      title: 'Updated Task',
      description: 'Updated task description',
    });
  });
});
