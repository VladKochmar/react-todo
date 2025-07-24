import ProgressBar from './ProgressBar';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ProgressBar', () => {
  it('renders correct percent and task count', () => {
    render(<ProgressBar total={10} completed={7} />);

    expect(screen.getByText('70% complete')).toBeInTheDocument();
    expect(screen.getByText('7 of 10 tasks')).toBeInTheDocument();
  });

  it('renders correct width style', () => {
    render(<ProgressBar total={4} completed={1} />);
    const bar = screen.getByTestId('progress-bar');
    expect(bar?.style.width).toBe('25%');
  });
});
