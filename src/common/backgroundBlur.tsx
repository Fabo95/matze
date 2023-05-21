import { Box } from 'common/box';

type BackgroundBlurProps = {
  isBlurred: boolean;
  handleUnblur: () => void;
};

export const BackgroundBlur = ({
  handleUnblur,
  isBlurred,
}: BackgroundBlurProps) => (
  <Box
    className={`position-absolute-0 z-index-10 ${
      isBlurred
        ? 'backdrop-blur-animation-backdrop-filter-in'
        : 'backdrop-blur-animation-backdrop-filter-out backdrop-blur-transition-transform-delay-250 translate-x-full-left'
    }`}
    onClick={() => isBlurred && handleUnblur()}
  />
);
