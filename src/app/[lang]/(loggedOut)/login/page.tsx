import { Box } from 'common/box';
import { Form } from 'common/form';
import { Input } from 'common/input';
import { Button } from 'common/button';
import { Locale } from 'utils/types';
import { getTFunction } from 'i18n/get-t-function';
import { Heading } from 'common/heading';
import { Label } from 'common/label';
import { apiPostLogin } from 'serverAction/serverActions';

export default async function Login({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getTFunction(lang);

  // --- HELPERS ---

  const headline = t('pages.login.headline');
  const buttonTitle = t('pages.login.cta');
  const emailLabel = t('pages.login.emailLabel');
  const passwordLabel = t('pages.login.passwordLabel');

  // --- RENDER ---

  return (
    <Box className="login-page">
      <Box className="login-page-container">
        <Heading className="login-page-headline">{headline}</Heading>

        <Form action={apiPostLogin} className="login-form">
          <Label className="login-form-label" htmlFor="email">
            {emailLabel}
          </Label>
          <Input
            className="login-form-input"
            id="email"
            name="email"
            type="text"
          />
          <Label className="login-form-label" htmlFor="password">
            {passwordLabel}
          </Label>
          <Input
            // TODO Build show password toggle
            className="login-form-input"
            id="password"
            name="password"
            type="password"
          />
          <Button
            buttonTitle={buttonTitle}
            className="login-form-cta"
            type="submit"
          />
        </Form>
      </Box>
    </Box>
  );
}
