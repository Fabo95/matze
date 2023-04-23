import { getTFunction } from 'i18n/get-t-function';
import { Locale } from 'utils/types';
import { Box } from 'base/box';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getTFunction(lang);

  return (
    <>
      <Box className="bg-transparent h-1/3 items-center justify-center p-4 text-6xl font-bold text-white-full">
        00:30:00
      </Box>
      <Box className="bg-transparent h-2/3 rounded-t-lg bg-white-full p-4">
        00:30:00
      </Box>
    </>
  );
}
