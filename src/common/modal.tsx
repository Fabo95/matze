import { forwardRef, ReactNode, Ref } from 'react';

import { XMarkIcon } from 'icons/xMarkIcon';
import { UnstyledButton } from 'common/unstyledButton';
import { Dialog } from 'common/dialog';
import { Box } from 'common/box';

type ModalProps = {
  containerClassName: string;
  closeModal: () => void;
  children: ReactNode;
};

export const Modal = forwardRef(
  (
    { containerClassName, children, closeModal }: ModalProps,
    ref: Ref<HTMLDialogElement>
  ) => (
    <Dialog className={`${containerClassName} modal`} ref={ref}>
      <Box className="modal-content">
        <UnstyledButton onClick={closeModal}>
          <XMarkIcon className="modal-content-close-icon" />
        </UnstyledButton>
        {children}
      </Box>
    </Dialog>
  )
);
