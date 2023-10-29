import { DialogHTMLAttributes, forwardRef, Ref } from 'react';

import { XMarkIcon } from 'icons/xMarkIcon';
import { UnstyledButton } from 'core/unstyledButton';
import { Dialog } from 'core/dialog';
import { Box } from 'core/box';

type ModalProps = {
  containerClassName: string;
  closeModal: () => void;
} & DialogHTMLAttributes<HTMLDialogElement>;

export const Modal = forwardRef(
  (
    { containerClassName, children, closeModal, ...modalProps }: ModalProps,
    ref: Ref<HTMLDialogElement>
  ) => (
    <Dialog className={`${containerClassName} modal`} ref={ref} {...modalProps}>
      <Box className="modal-content">
        <UnstyledButton onClick={closeModal}>
          <XMarkIcon className="modal-content-close-icon" />
        </UnstyledButton>
        {children}
      </Box>
    </Dialog>
  )
);
