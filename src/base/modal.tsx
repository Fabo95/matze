import { ReactNode } from 'react';
import { Box } from 'base/box';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

export const Modal = ({ children, isOpen }: ModalProps) => (
  <Box
    className={`absolute inset-x-8 inset-y-11 z-50 rounded-lg bg-white-full ${
      isOpen ? 'block' : 'hidden'
    }`}
  >
    {children}
  </Box>
);
