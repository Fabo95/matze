import { ReactNode } from 'react';
import { Box } from 'base/box';
import { XMarkIcon } from 'icons/xMarkIcon';
import { UnstyledButton } from 'base/unstyledButton';

type ModalProps = {
  contentClassName: string;
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
};

export const Modal = ({
  contentClassName,
  children,
  closeModal,
  isOpen,
}: ModalProps) => (
  <Box
    className={`${contentClassName} absolute inset-x-8 inset-y-11 z-50 rounded-lg p-10 ${
      isOpen
        ? 'animate-opacity-animation-up'
        : 'translate-x-full-left animate-opacity-animation-down transition-transform delay-250'
    }`}
  >
    <UnstyledButton onClick={closeModal}>
      <XMarkIcon className="absolute right-10 top-10 stroke-white-full" />
    </UnstyledButton>

    {children}
  </Box>
);
