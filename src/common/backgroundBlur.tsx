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
    className={`background-blur ${
      isBlurred
        ? 'backdrop-blur-animation-backdrop-filter-in'
        : 'backdrop-blur-animation-backdrop-filter-out'
    }`}
    onClick={() => isBlurred && handleUnblur()}
  />
);
