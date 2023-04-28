import { Box } from 'base/box';

type BackgroundBlurProps = {
  isBlurred: boolean;
  handleUnblur: () => void;
};

export const BackgroundBlur = ({
  handleUnblur,
  isBlurred,
}: BackgroundBlurProps) => (
  <Box
    className={`absolute bottom-0 left-0 right-0 top-0 ${
      isBlurred
        ? 'animate-backdrop-filter-animation-in'
        : 'translate-x-full-left animate-backdrop-filter-animation-out transition-transform delay-250'
    }`}
    onClick={() => isBlurred && handleUnblur()}
  />
);
