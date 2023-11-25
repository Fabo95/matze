import { DialogHTMLAttributes, forwardRef, Ref } from 'react';

import { Box } from '@Interval/components/core/box';
import { Dialog } from '@Interval/components/core/dialog';
import { UnstyledButton } from '@Interval/components/core/unstyledButton';
import { XMarkIcon } from '@Interval/components/icons/xMarkIcon';

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
