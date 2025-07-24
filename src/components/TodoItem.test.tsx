import TodoItem from './TodoItem';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const mockTask = {
  id: 1,
  title: 'Test task',
  done: false,
  description: '',
  deadline: '',
};

describe('TodoItem', () => {
  it('renders task title', () => {
    render(<TodoItem task={mockTask} onEdit={() => {}} onToggleDone={() => {}} onRemove={() => {}} />);
    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = vi.fn();
    render(<TodoItem task={mockTask} onEdit={onEdit} onToggleDone={() => {}} onRemove={() => {}} />);

    const editButton = screen.getByRole('button', { name: /open edit task modal window/i });
    fireEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledWith(1);
  });

  it('calls onToggleDone when checkbox is clicked', () => {
    const onToggleDone = vi.fn();
    render(<TodoItem task={mockTask} onEdit={() => {}} onToggleDone={onToggleDone} onRemove={() => {}} />);

    const checkbox = screen.getByRole('button', { name: /toggle task/i });
    fireEvent.click(checkbox);

    expect(onToggleDone).toHaveBeenCalledWith(1);
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = vi.fn();
    render(<TodoItem task={mockTask} onEdit={() => {}} onToggleDone={() => {}} onRemove={onRemove} />);

    const removeButton = screen.getByRole('button', { name: /remove task/i });
    fireEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalledWith(1);
  });
});
