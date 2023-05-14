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
    className={`absolute inset-x-0 inset-y-0 z-50  p-11 ${
      isOpen
        ? 'animate-opacity-animation-up'
        : 'translate-x-full-left animate-opacity-animation-down transition-transform delay-250'
    }`}
  >
    <Box className={`${contentClassName} relative h-full rounded-lg p-10`}>
      <UnstyledButton onClick={closeModal}>
        <XMarkIcon className="absolute right-10 top-10 stroke-white-full" />
      </UnstyledButton>

      {children}
    </Box>
  </Box>
);
