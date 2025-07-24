import Modal from './Modal';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Modal', () => {
  const title = 'Test Modal';
  const content = 'Hello from modal';

  it("doesn't render if open = false", () => {
    render(
      <Modal open={false} title={title} onClose={() => {}} onTransitionEnd={() => {}}>
        <p>{content}</p>
      </Modal>
    );

    expect(screen.queryByText(content)).not.toBeInTheDocument();
  });

  it('renders if open = true', () => {
    render(
      <Modal open={true} title={title} onClose={() => {}} onTransitionEnd={() => {}}>
        <p>{content}</p>
      </Modal>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('calls onClose when clicking on the overlay', async () => {
    const onClose = vi.fn();

    render(
      <Modal open={true} title={title} onClose={onClose} onTransitionEnd={() => {}}>
        <p>{content}</p>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    await userEvent.click(overlay);

    expect(onClose).toHaveBeenCalled();
  });

  it("doesn't call onClose when clicked inside a modal window", async () => {
    const onClose = vi.fn();

    render(
      <Modal open={true} title={title} onClose={onClose} onTransitionEnd={() => {}}>
        <p>{content}</p>
      </Modal>
    );

    const modalContent = screen.getByText(content);
    await userEvent.click(modalContent);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when clicking on the cross icon', async () => {
    const onClose = vi.fn();

    render(
      <Modal open={true} title={title} onClose={onClose} onTransitionEnd={() => {}}>
        <p>{content}</p>
      </Modal>
    );

    const closeButton = screen.getByLabelText(/close modal/i);
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('closes the modal when transition completes, if open = false', () => {
    const { rerender } = render(
      <Modal open={true} onClose={() => {}} onTransitionEnd={() => {}} title={title}>
        <p>{content}</p>
      </Modal>
    );

    rerender(
      <Modal open={false} onClose={() => {}} onTransitionEnd={() => {}} title={title}>
        <p>{content}</p>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.transitionEnd(overlay);

    expect(screen.queryByText(content)).not.toBeInTheDocument();
  });
});
