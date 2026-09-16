import React, { useId, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Dialog = styled.dialog`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  border: none;
  padding: max(8px, env(safe-area-inset-top))
    max(20px, env(safe-area-inset-right))
    max(20px, env(safe-area-inset-bottom))
    max(20px, env(safe-area-inset-left));
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.9);
  color: ${theme.colors.secondary};
  overflow: hidden;
  overscroll-behavior: contain;

  &[open] {
    display: grid;
    grid-template-rows: 44px minmax(0, 1fr) auto 48px;
    gap: 10px;
  }

  &::backdrop {
    background: transparent;
  }

  @media (max-width: 600px), (max-height: 500px) {
    padding: max(8px, env(safe-area-inset-top))
      max(8px, env(safe-area-inset-right))
      max(8px, env(safe-area-inset-bottom))
      max(8px, env(safe-area-inset-left));

    &[open] {
      gap: 8px;
    }
  }
`;

const CloseButton = styled.button`
  justify-self: end;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  padding: 0;
  background: none;
  border: none;
  color: ${theme.colors.secondary};
  cursor: pointer;
  touch-action: manipulation;

  &:hover {
    color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 3px solid ${theme.colors.secondary};
    outline-offset: 2px;
  }
`;

const ImageStage = styled.div`
  justify-self: center;
  min-width: 0;
  min-height: 0;
  width: 90vw;
  max-width: 100%;
  height: 100%;

  img {
    display: block;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    object-fit: contain;
  }
`;

const ImageCaption = styled.div`
  min-width: 0;
  max-height: 20vh;
  max-height: 20dvh;
  overflow-y: auto;
  overflow-wrap: anywhere;
  color: ${theme.colors.secondary};
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.3;
`;

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const NavButton = styled.button`
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  flex: 0 0 48px;
  padding: 0;
  background-color: #e91e63;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #d81557;
  }

  &:disabled {
    background-color: #aaaaaa;
    cursor: default;
  }

  &:focus-visible {
    outline: 3px solid ${theme.colors.secondary};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

interface ImageDialogProps {
  src: string;
  alt: string;
  caption: string;
  label: string;
  previousLabel: string;
  nextLabel: string;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
  closeOnBackground?: boolean;
}

const ImageDialog: React.FC<ImageDialogProps> = ({
  src,
  alt,
  caption,
  label,
  previousLabel,
  nextLabel,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  onClose,
  closeOnBackground = false,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const captionId = useId();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const opener = document.activeElement;
    const body = document.body;
    const root = document.documentElement;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const bodyStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    const rootOverflow = root.style.overflow;

    // Fixing the body also locks scrolling on touch browsers.
    root.style.overflow = 'hidden';
    Object.assign(body.style, {
      position: 'fixed',
      top: `-${scrollY}px`,
      left: `-${scrollX}px`,
      width: '100%',
      overflow: 'hidden',
    });
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      Object.assign(body.style, bodyStyles);
      root.style.overflow = rootOverflow;
      const scrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(scrollX, scrollY);
      root.style.scrollBehavior = scrollBehavior;
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
    };
  }, []);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const focused = document.activeElement;
    if (
      dialog?.open &&
      (!dialog.contains(focused) ||
        (focused instanceof HTMLButtonElement && focused.disabled))
    ) {
      closeRef.current?.focus({ preventScroll: true });
    }
  }, [hasPrevious, hasNext]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'Tab') {
      event.preventDefault();
      const dialog = event.currentTarget;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]')
      ).filter(element => {
        const visibility = window.getComputedStyle(element).visibility;
        return element.tabIndex >= 0 &&
          !element.matches(':disabled') &&
          !element.closest('[inert]') &&
          element.getClientRects().length > 0 &&
          visibility !== 'hidden' &&
          visibility !== 'collapse';
      });

      if (focusable.length === 0) {
        dialog.focus({ preventScroll: true });
        return;
      }

      const currentIndex = focusable.findIndex(element => element === document.activeElement);
      const nextIndex = currentIndex === -1
        ? (event.shiftKey ? focusable.length - 1 : 0)
        : (currentIndex + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length;
      focusable[nextIndex].focus({ preventScroll: true });
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (hasPrevious) onPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (hasNext) onNext();
    }
  };

  return (
    <Dialog
      ref={dialogRef}
      tabIndex={-1}
      data-image-dialog=""
      aria-label={label}
      aria-describedby={captionId}
      aria-modal="true"
      onKeyDown={handleKeyDown}
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
      onClick={event => {
        if (closeOnBackground && event.target === event.currentTarget) onClose();
      }}
    >
      <CloseButton ref={closeRef} type="button" onClick={onClose} aria-label="Close modal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </CloseButton>
      <ImageStage>
        <img src={src} alt={alt} />
      </ImageStage>
      <ImageCaption id={captionId} aria-live="polite" aria-atomic="true">
        {caption}
      </ImageCaption>
      <NavigationWrapper>
        <NavButton type="button" onClick={onPrevious} disabled={!hasPrevious} aria-label={previousLabel}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </NavButton>
        <NavButton type="button" onClick={onNext} disabled={!hasNext} aria-label={nextLabel}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </NavButton>
      </NavigationWrapper>
    </Dialog>
  );
};

export default ImageDialog;
