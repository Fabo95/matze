import { Box } from 'base/box';

export const MenuBackgroundBlur = ({
  handleUnblur,
  isBlurred,
}: {
  isBlurred: boolean;
  handleUnblur: () => void;
}) => (
  <Box
    className={`absolute bottom-0 left-0 right-0 top-0 bg-white-full ${
      isBlurred ? 'opacity-80' : 'translate-x-full-left'
    }`}
    onClick={() => isBlurred && handleUnblur()}
  />
);
