import { DialogHTMLAttributes, forwardRef, Ref } from 'react';

import { XMarkIcon } from 'components/icons/xMarkIcon';
import { UnstyledButton } from 'components/core/unstyledButton';
import { Dialog } from 'components/core/dialog';
import { Box } from 'components/core/box';

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
