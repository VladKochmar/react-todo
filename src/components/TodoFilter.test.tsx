import TodoFilter from './TodoFilter';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

describe('TodoFilter', () => {
  it('renders all filter buttons', () => {
    render(<TodoFilter filter="All" onFilter={() => {}} />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('calls onFilter when filter button is clicked', () => {
    const onFilter = vi.fn();
    render(<TodoFilter filter="All" onFilter={onFilter} />);

    const completedButton = screen.getByText('Completed');
    fireEvent.click(completedButton);

    expect(onFilter).toHaveBeenCalledWith('Completed');
  });

  it('adds "active-filter-item" class to active filter', () => {
    render(<TodoFilter filter="Active" onFilter={() => {}} />);

    const activeButton = screen.getByText('Active');
    expect(activeButton.className).toContain('active-filter-item');
  });
});
