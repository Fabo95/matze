import Link from 'next/link';

import { getDictionary } from 'i18n/get-dictionary';
import { Locale } from 'utils/types';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getDictionary(lang);

  return (
    <>
      <h1 className="text-blue-9 font-sans">Hello, Next.js!</h1>

      <Link href="hallo">{t('pages.home.headline')}</Link>
    </>
  );
}
