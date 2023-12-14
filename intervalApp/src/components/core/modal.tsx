import { DialogHTMLAttributes, forwardRef, Ref } from "react";

import { Box } from "@Interval/components/core/box";
import { Dialog } from "@Interval/components/core/dialog";
import { CloseButton } from "@Interval/components/core/closeButton";

type ModalProps = {
    closeModal: () => void;
    containerClassName: string;
} & DialogHTMLAttributes<HTMLDialogElement>;

export const Modal = forwardRef(
    ({ children, closeModal, containerClassName, ...modalProps }: ModalProps, ref: Ref<HTMLDialogElement>) => (
        <Dialog className={`${containerClassName} modal`} ref={ref} {...modalProps}>
            <Box className="modal-content">
                <CloseButton iconClassName={"modal-content-close-icon"} onClick={closeModal} />

                {children}
            </Box>
        </Dialog>
    )
);
