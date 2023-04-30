import { ReactNode } from 'react';
import { Box } from 'base/box';

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
    className={`absolute bottom-0 left-0 right-0 top-0 ${
      isOpen
        ? 'animate-opacity-animation-up'
        : 'translate-x-full-left animate-opacity-animation-down transition-transform delay-250'
    }`}
    onClick={closeModal}
  >
    <Box
      className={`${contentClassName} absolute inset-x-8 inset-y-11 z-50 rounded-lg p-8 duration-300`}
    >
      {children}
    </Box>
  </Box>
);
