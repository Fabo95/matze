import { getTFunction } from 'i18n/get-t-function';
import { Locale } from 'utils/types';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getTFunction(lang);

  const res = await fetch('http://localhost:3002/testi');

  console.log('res', res);

  return String(res.body);
}
