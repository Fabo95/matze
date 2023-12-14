import { toast, ToastContent, ToastOptions } from "react-toastify";

export const showToast = <TData>(content: ToastContent<TData>, options?: ToastOptions) => {
    toast(content, options);
};
