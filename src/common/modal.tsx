import { forwardRef, ReactNode, Ref } from 'react';

import { XMarkIcon } from 'icons/xMarkIcon';
import { UnstyledButton } from 'common/unstyledButton';
import { Dialog } from 'common/dialog';
import { Box } from 'common/box';

type ModalProps = {
  contentClassName: string;
  closeModal: () => void;
  children: ReactNode;
};

export const Modal = forwardRef(
  (
    { contentClassName, children, closeModal }: ModalProps,
    ref: Ref<HTMLDialogElement>
  ) => (
    <Dialog
      className={`${contentClassName} modal padding-2-25 border-radius-0-5`}
      ref={ref}
    >
      <Box className="position-relative height-full width-full">
        <UnstyledButton onClick={closeModal}>
          <XMarkIcon className="modal-x-mark-icon-position position-absolute" />
        </UnstyledButton>
        {children}
      </Box>
    </Dialog>
  )
);
