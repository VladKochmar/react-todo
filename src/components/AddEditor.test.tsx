import AddEditor from './AddEditor';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('AddEditor', () => {
  it('shows error if trying to add empty task', async () => {
    render(<AddEditor onAdd={vi.fn()} inputRef={{ current: null }} />);
    await userEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByText(/please enter a task title/i)).toBeInTheDocument();
  });

  it('calls onAdd with input value and clears input', async () => {
    const onAdd = vi.fn();
    render(<AddEditor onAdd={onAdd} inputRef={{ current: null }} />);

    const input = screen.getByTestId('task-title-input');
    await userEvent.type(input, 'Write some tests');

    await userEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(onAdd).toHaveBeenCalledWith('Write some tests');
    expect(input).toHaveValue('');
  });
});
